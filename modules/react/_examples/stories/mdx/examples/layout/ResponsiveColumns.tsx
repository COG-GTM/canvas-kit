import * as React from 'react';

import {SegmentedControl} from '@workday/canvas-kit-react/segmented-control';
import {BodyText, Heading} from '@workday/canvas-kit-react/text';
import {createStencil, createStyles, px2rem} from '@workday/canvas-kit-styling';
import {base, system} from '@workday/canvas-tokens-web';

const segmentedControlListStyles = createStyles({
  marginBlockEnd: system.gap.lg,
});

const screenStencil = createStencil({
  vars: {
    maxWidth: '',
  },
  base: ({maxWidth}) => ({
    boxSizing: 'border-box',
    maxWidth,
    padding: system.padding.md,
    border: `${px2rem(2)} solid ${system.color.border.default}`,
  }),
});

const gridStyles = createStyles({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fit, minmax(${px2rem(200)}, 1fr))`,
  gridGap: system.gap.md,
});

const columnStencil = createStencil({
  vars: {
    backgroundColor: '',
  },
  base: ({backgroundColor}) => ({
    height: px2rem(120),
    backgroundColor,
  }),
});

export const ResponsiveColumns = () => {
  const [screen, setScreen] = React.useState('100%');

  return (
    <>
      <Heading size="medium">Responsive Columns</Heading>
      <BodyText size="small">Choose screen size to see changes</BodyText>
      <SegmentedControl initialValue={screen} onSelect={data => setScreen(data.id)}>
        <SegmentedControl.List aria-label="screen-size" cs={segmentedControlListStyles}>
          <SegmentedControl.Item data-id="100%">100%</SegmentedControl.Item>
          <SegmentedControl.Item data-id="75%">75%</SegmentedControl.Item>
          <SegmentedControl.Item data-id="50%">50%</SegmentedControl.Item>
          <SegmentedControl.Item data-id="25%">25%</SegmentedControl.Item>
        </SegmentedControl.List>
      </SegmentedControl>
      <div {...screenStencil({maxWidth: screen})}>
        <div className={gridStyles}>
          <div {...columnStencil({backgroundColor: base.blue400})} />
          <div {...columnStencil({backgroundColor: base.blue500})} />
          <div {...columnStencil({backgroundColor: base.blue600})} />
        </div>
      </div>
    </>
  );
};
