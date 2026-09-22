import * as React from 'react';

import {BodyText, Heading} from '@workday/canvas-kit-react/text';
import {createStencil, createStyles, px2rem} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const gridStyles = createStyles({
  display: 'grid',
  gridTemplateAreas: `
    'Heading Heading Heading Heading' 
    'FormTopHalfLeft FormTopHalfLeft FormQuarterLeft FormQuarterRight'
    'FormHalfLeft FormHalfLeft FormHalfRight FormHalfRight '
  `,
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridAutoRows: 'min-content',
  gridRowGap: system.gap.sm,
  gridColumnGap: system.gap.xxl,
  '> *:first-child': {
    boxSizing: 'border-box',
    paddingInline: system.padding.sm,
    border: `${px2rem(1)} solid ${system.color.brand.border.primary}`,
    gridArea: 'Heading',
  },
});

export const Tiled4and2Columns = () => (
  <div className={gridStyles}>
    <div>
      <Heading size="medium">4 and 2 Column Tiled View</Heading>
    </div>
    <FormSkeleton area="FormTopHalfLeft" text="Form - Top Left Half" />
    <FormSkeleton area="FormQuarterLeft" text="Form - Left Quarter" />
    <FormSkeleton area="FormQuarterRight" text="Form - Right Quarter" />
    <FormSkeleton area="FormHalfLeft" text="Form - Left Half" />
    <FormSkeleton area="FormHalfRight" text="Form - Right Half" />
  </div>
);

const formStencil = createStencil({
  vars: {
    area: '',
  },
  base: ({area}) => ({
    boxSizing: 'border-box',
    paddingInline: system.padding.md,
    border: `${px2rem(1)} dashed ${system.color.brand.border.primary}`,
    gridArea: area,
    p: {
      fontWeight: system.fontWeight.bold,
    },
  }),
});

const innerGridStyles = createStyles({
  display: 'grid',
  gridGap: system.gap.sm,
  marginBlockEnd: system.gap.xl,
  '> *:first-child': {
    width: px2rem(120),
    height: system.size.xxs,
    backgroundColor: system.color.surface.alt.default,
  },
  '> *:last-child': {
    boxSizing: 'border-box',
    border: `${px2rem(1)} solid ${system.color.border.default}`,
    width: '100%',
    height: system.size.xxs,
  },
});

const boldTextStyles = createStyles({
  fontWeight: system.fontWeight.bold,
});

const FormSkeleton = ({area, text}) => (
  <div {...formStencil({area})}>
    <BodyText size="small" cs={boldTextStyles}>
      {text}
    </BodyText>
    {Array.from({length: 3}).map(() => (
      <div className={innerGridStyles}>
        <div />
        <div />
      </div>
    ))}
  </div>
);
