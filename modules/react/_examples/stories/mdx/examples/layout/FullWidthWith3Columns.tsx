import * as React from 'react';

import {BodyText, Heading} from '@workday/canvas-kit-react/text';
import {createStencil, createStyles, px2rem} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const gridStyles = createStyles({
  display: 'grid',
  gridTemplateAreas: "'Heading Heading Heading' 'FormLeft FormCenter FormRight'",
  gridAutoRows: 'min-content',
  gridRowGap: system.gap.sm,
  gridColumnGap: system.gap.xxl,
});

const headingStencil = createStencil({
  vars: {
    gridArea: '',
  },
  base: ({gridArea}) => ({
    boxSizing: 'border-box',
    paddingInline: system.padding.sm,
    border: `${px2rem(1)} solid ${system.color.brand.border.primary}`,
    gridArea,
  }),
});

const formStencil = createStencil({
  vars: {
    gridArea: '',
  },
  base: ({gridArea}) => ({
    boxSizing: 'border-box',
    paddingInline: system.padding.md,
    border: `${px2rem(1)} dashed ${system.color.brand.border.primary}`,
    gridArea,
  }),
});

const formRowStyles = createStyles({
  display: 'grid',
  gridGap: system.gap.sm,
  marginBlockEnd: px2rem(20),
});

const formLabelStyles = createStyles({
  backgroundColor: system.color.surface.default,
  width: px2rem(120),
  height: px2rem(12),
});

const formInputStyles = createStyles({
  boxSizing: 'border-box',
  border: `${px2rem(1)} solid ${system.color.brand.border.primary}`,
  width: '100%',
  height: px2rem(20),
});

export const FullWidthWith3Columns = () => (
  <div className={gridStyles}>
    <div {...headingStencil({gridArea: 'Heading'})}>
      <Heading size="medium">Full Width With 3 Columns</Heading>
    </div>
    <FormSkeleton area="FormLeft" text="Form - Left Third" />
    <FormSkeleton area="FormCenter" text="Form - Center Third" />
    <FormSkeleton area="FormRight" text="Form - Right Third" />
  </div>
);

const boldTextStyles = createStyles({
  fontWeight: system.fontWeight.bold,
});

const FormSkeleton = ({area, text}) => (
  <div {...formStencil({gridArea: area})}>
    <BodyText size="small" cs={boldTextStyles}>
      {text}
    </BodyText>
    {Array.from({length: 5}).map(() => (
      <div className={formRowStyles}>
        <div className={formLabelStyles} />
        <div className={formInputStyles} />
      </div>
    ))}
  </div>
);
