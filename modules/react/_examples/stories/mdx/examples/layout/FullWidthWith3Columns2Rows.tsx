import * as React from 'react';

import {BodyText, Heading} from '@workday/canvas-kit-react/text';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const gridStyles = createStyles({
  display: 'grid',
  gridTemplateAreas: "'Heading Heading Heading'",
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridAutoRows: 'min-content',
  gridRowGap: system.gap.sm,
  gridColumnGap: system.gap.xl,
});

const headingStyles = createStyles({
  boxSizing: 'border-box',
  gridArea: 'Heading',
  paddingInline: system.padding.sm,
  border: `${px2rem(1)} solid ${system.color.brand.border.primary}`,
});

export const FullWidthWith3Columns2Rows = () => (
  <div className={gridStyles}>
    <div className={headingStyles}>
      <Heading size="medium">Full Width With 3 Columns and 2 Rows</Heading>
    </div>
    <FormSkeleton />
    <FormSkeleton />
    <FormSkeleton />
    <FormSkeleton />
    <FormSkeleton />
    <FormSkeleton />
  </div>
);

const formStyles = createStyles({
  boxSizing: 'border-box',
  border: `${px2rem(1)} dashed ${system.color.brand.border.primary}`,
  paddingInline: system.padding.md,
});

const boldTextStyles = createStyles({
  fontWeight: system.fontWeight.bold,
});

const itemStyles = createStyles({
  display: 'grid',
  gridGap: system.gap.md,
  marginBlockEnd: system.gap.lg,
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

const FormSkeleton = props => (
  <div className={formStyles} {...props}>
    <BodyText size="small" cs={boldTextStyles}>
      Form Block
    </BodyText>
    {Array.from({length: 3}).map(() => (
      <div className={itemStyles}>
        <div />
        <div />
      </div>
    ))}
  </div>
);
