import {renderHook} from '@testing-library/react-hooks';
import {expectTypeOf} from 'expect-type';

import {createModelHook} from '../lib/utils/models';

describe('createModelHook', () => {
  const useTestModel = createModelHook({
    defaultConfig: {
      foo: '',
    },
    requiredConfig: {
      bar: '',
    },
  })(config => {
    return {
      state: {
        baz: '',
      },
      events: {
        select(value: string) {
          //
        },
      },
    };
  });

  it('should set the correct TConfig type', () => {
    expectTypeOf(useTestModel.TConfig).toMatchTypeOf<{
      foo?: string;
      bar: string;
      onSelect?: (value: string, prevState: {baz: string}) => void;
      shouldSelect?: (value: string, state: {baz: string}) => boolean;
    }>();
  });

  it('should set the correct type for `defaultConfig`', () => {
    expectTypeOf(useTestModel.defaultConfig).toMatchTypeOf<{foo: string}>();
  });

  it('should set the correct type for `requiredConfig`', () => {
    expectTypeOf(useTestModel.requiredConfig).toMatchTypeOf<{bar: string}>();
  });

  it('should set the correct type for `getElemProps`', () => {
    const elemProps = useTestModel.getElemProps({
      foo: '',
      bar: '',
      onSelect() {
        /* */
      },
      shouldSelect() {
        return true;
      },
      'data-extra': 'foo',
    });

    expect(elemProps).toHaveProperty('data-extra', 'foo');
    expectTypeOf(elemProps).toMatchTypeOf<{'data-extra': string}>();
  });

  it('should produce the correct merged config type', () => {
    const config = useTestModel.mergeConfig(
      {...useTestModel.defaultConfig, ...useTestModel.requiredConfig},
      {
        onSelect() {
          /**/
        },
      }
    );

    expectTypeOf(config).toMatchTypeOf<{
      foo?: string;
      bar: string;
      onSelect?: (value: string, prevState: {baz: string}) => void;
      shouldSelect?: (value: string, state: {baz: string}) => boolean;
    }>();
  });

  it('should override defaultConfig values with `undefined` if `undefined` is allowed', () => {
    const useTestModel = createModelHook({
      defaultConfig: {
        foo: undefined,
      },
    })(config => {
      return {state: {foo: config.foo}, events: {}};
    });

    const {result} = renderHook(() =>
      useTestModel({
        foo: undefined,
      })
    );

    expect(result.current.state).toHaveProperty('foo', undefined);
  });

  it('should not override defaultConfig values with `undefined` if `undefined` is not allowed', () => {
    const useTestModel = createModelHook({
      defaultConfig: {
        foo: 'bar',
      },
    })(config => {
      return {state: {foo: config.foo}, events: {}};
    });

    const {result} = renderHook(() =>
      useTestModel({
        foo: undefined,
      })
    );

    expect(result.current.state).toHaveProperty('foo', 'bar');
  });
});
