import {act, renderHook} from '@testing-library/react-hooks';

import {getHiddenIds, useOverflowListModel} from '../lib/useOverflowListModel';

describe('useOverflowModel', () => {
  describe('getHiddenIds', () => {
    const itemSizeCache = {
      first: 100,
      second: 150,
      third: 200,
      fourth: 250,
    };
    const overflowTargeSize = 100;

    [
      {
        containerSize: 100,
        gap: 0,
        selected: 'first',
        hiddenIds: ['first', 'second', 'third', 'fourth'],
      },
      {
        containerSize: 199,
        gap: 0,
        selected: 'first',
        hiddenIds: ['first', 'second', 'third', 'fourth'],
      },
      {
        containerSize: 200,
        gap: 0,
        selected: 'first',
        hiddenIds: ['second', 'third', 'fourth'],
      },
      {containerSize: 700, gap: 0, selected: 'first', hiddenIds: []},
      {containerSize: 350, gap: 0, selected: 'first', hiddenIds: ['third', 'fourth']},
      {containerSize: 549, gap: 0, selected: 'first', hiddenIds: ['third', 'fourth']},
      {containerSize: 550, gap: 0, selected: 'first', hiddenIds: ['fourth']},
      {
        containerSize: 250,
        gap: 0,
        selected: 'second',
        hiddenIds: ['first', 'third', 'fourth'],
      },
      // gap
      {
        containerSize: 100,
        gap: 10,
        selected: 'first',
        hiddenIds: ['first', 'second', 'third', 'fourth'],
      },
      {
        containerSize: 199,
        gap: 10,
        selected: 'first',
        hiddenIds: ['first', 'second', 'third', 'fourth'],
      },
      {
        containerSize: 200,
        gap: 10,
        selected: 'first',
        hiddenIds: ['second', 'third', 'fourth'],
      },
      {containerSize: 729, gap: 10, selected: 'first', hiddenIds: ['fourth']},
      {containerSize: 730, gap: 10, selected: 'first', hiddenIds: []},
      {containerSize: 360, gap: 10, selected: 'first', hiddenIds: ['third', 'fourth']},
      {containerSize: 559, gap: 10, selected: 'first', hiddenIds: ['third', 'fourth']},
      {containerSize: 570, gap: 10, selected: 'first', hiddenIds: ['fourth']},
      {
        containerSize: 250,
        gap: 10,
        selected: 'second',
        hiddenIds: ['first', 'third', 'fourth'],
      },
    ].forEach(({containerSize, hiddenIds, gap, selected}) => {
      it(`when containerSize is ${containerSize} and selected is '${selected}' should contain hiddenIds [${hiddenIds.join(
        ', '
      )}] `, () => {
        expect(
          getHiddenIds(
            containerSize,
            gap,
            overflowTargeSize,
            itemSizeCache,
            [selected],
            [
              {id: 'first', value: 'first', index: 0, textValue: 'first'},
              {id: 'second', value: 'second', index: 1, textValue: 'second'},
              {id: 'third', value: 'third', index: 2, textValue: 'third'},
              {id: 'fourth', value: 'fourth', index: 3, textValue: 'fourth'},
            ]
          )
        ).toEqual(hiddenIds);
      });
    });

    it('should keep the selected item visible when items use a custom id field instead of `id`', () => {
      expect(
        getHiddenIds(250, 0, overflowTargeSize, itemSizeCache, ['second'], [
          {index: 0, value: {contextId: 'first'}, textValue: 'First'},
          {index: 1, value: {contextId: 'second'}, textValue: 'Second'},
          {index: 2, value: {contextId: 'third'}, textValue: 'Third'},
          {index: 3, value: {contextId: 'fourth'}, textValue: 'Fourth'},
        ] as any)
      ).toEqual(['first', 'third', 'fourth']);
    });

    const items = [
      {id: 'first', value: 'first', index: 0, textValue: 'first'},
      {id: 'second', value: 'second', index: 1, textValue: 'second'},
      {id: 'third', value: 'third', index: 2, textValue: 'third'},
      {id: 'fourth', value: 'fourth', index: 3, textValue: 'fourth'},
    ];

    it('should not pin an unmeasured selected id when the first item is cached', () => {
      expect(
        getHiddenIds(
          250,
          0,
          overflowTargeSize,
          {first: 100, second: 150, third: 200},
          ['fourth'],
          items
        )
      ).toEqual(['second', 'third']);
    });

    it('should leave the selected item unpinned when neither the selected id nor the first item is cached', () => {
      expect(
        getHiddenIds(250, 0, overflowTargeSize, {second: 150, third: 200}, ['fourth'], items)
      ).toEqual(['third']);
    });

    it('should ignore inherited prototype identifiers such as toString', () => {
      expect(getHiddenIds(250, 0, overflowTargeSize, itemSizeCache, ['toString'], items)).toEqual([
        'second',
        'third',
        'fourth',
      ]);
    });
  });

  describe('useOverflowListModel', () => {
    const items = [{id: 'first'}, {id: 'second'}, {id: 'third'}];

    it('should not expose the width-only state aliases removed in v17', () => {
      const {result} = renderHook(() => useOverflowListModel({items}));

      expect(result.current.state).not.toHaveProperty('itemWidthCache');
      expect(result.current.state).not.toHaveProperty('containerWidth');
    });

    ['setContainerWidth', 'setOverflowTargetWidth', 'addItemWidth', 'removeItemWidth'].forEach(
      event => {
        it(`should not expose the width-only '${event}' event removed in v17`, () => {
          const {result} = renderHook(() => useOverflowListModel({items}));

          expect(result.current.events).not.toHaveProperty(event);
        });
      }
    );

    it('should hide items using the size-based events', () => {
      const {result} = renderHook(() =>
        useOverflowListModel({items, initialSelectedIds: ['first'], orientation: 'horizontal'})
      );

      act(() => {
        result.current.events.setOverflowTargetSize({width: 50, height: 0});
        items.forEach(item =>
          result.current.events.addItemSize({id: item.id, width: 100, height: 0})
        );
        result.current.events.setContainerSize({width: 250, height: 0});
      });

      expect(result.current.state.itemSizeCache).toEqual({first: 100, second: 100, third: 100});
      expect(result.current.state.containerSize).toEqual(250);
      expect(result.current.state.hiddenIds).toEqual(['third']);

      act(() => {
        result.current.events.removeItemSize({id: 'third'});
      });

      expect(result.current.state.itemSizeCache).toEqual({first: 100, second: 100});
      expect(result.current.state.hiddenIds).toEqual([]);
    });
  });
});
