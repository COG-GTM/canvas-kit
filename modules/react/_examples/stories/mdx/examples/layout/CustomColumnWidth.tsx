import * as React from 'react';

import {BodyText, Heading} from '@workday/canvas-kit-react/text';
import {createStencil, createStyles, px2rem} from '@workday/canvas-kit-styling';
import {base, system} from '@workday/canvas-tokens-web';

const columnStencil = createStencil({
  vars: {
    backgroundColor: '',
  },
  base: ({backgroundColor}) => ({
    height: px2rem(120),
    backgroundColor,
    p: {
      textAlign: 'center',
      color: system.color.fg.inverse,
      fontWeight: system.fontWeight.bold,
    },
  }),
});

const gridStyles = createStyles({
  display: 'grid',
  gridTemplateColumns: '4fr 2fr 6fr',
  gridGap: system.gap.md,
});

export const CustomColumnWidth = () => (
  <>
    <Heading size="medium">Custom Column Width</Heading>
    <div className={gridStyles}>
      <div {...columnStencil({backgroundColor: base.blue500})}>
        <BodyText size="small">4 column width</BodyText>
      </div>
      <div {...columnStencil({backgroundColor: base.blue600})}>
        <BodyText size="small">2 column width</BodyText>
      </div>
      <div {...columnStencil({backgroundColor: base.blue700})}>
        <BodyText size="small">6 column width</BodyText>
      </div>
    </div>
  </>
);
