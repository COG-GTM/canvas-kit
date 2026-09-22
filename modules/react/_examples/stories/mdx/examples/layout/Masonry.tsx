import * as React from 'react';

import {Heading} from '@workday/canvas-kit-react/text';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  columnCount: 3,
  columnGap: system.gap.md,
});

const cardStyles = createStyles({
  boxSizing: 'border-box',
  breakInside: 'avoid',
  border: `${px2rem(2)} dashed ${system.color.brand.border.primary}`,
  marginBlockEnd: system.gap.sm,
  padding: system.padding.md,
});

const gridStyles = createStyles({
  display: 'grid',
  gridGap: system.gap.md,
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

export const Masonry = () => (
  <>
    <Heading size="medium">Masonry Layout</Heading>
    <div className={containerStyles}>
      {Array.from({length: 8}).map((_, ind) => (
        <div key={ind} className={cardStyles}>
          <div className={gridStyles}>
            <div />
            <div />
          </div>
          {ind % 2 === 0 && (
            <div className={gridStyles}>
              <div />
              <div />
            </div>
          )}
        </div>
      ))}
    </div>
  </>
);
