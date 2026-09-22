import * as React from 'react';

import {SidePanel, useSidePanelModel} from '@workday/canvas-kit-react/side-panel';
import {Text} from '@workday/canvas-kit-react/text';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';

const stylesOverride = {
  viewport: createStyles({
    display: 'flex',
    height: px2rem(320),
  }),
  main: createStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    flexBasis: 'auto',
  }),
};

export const Heading = () => {
  const model = useSidePanelModel({
    onStateTransition: state => {
      console.log(`state is: ${state}`);
    },
  });

  return (
    <div className={stylesOverride.viewport}>
      <SidePanel model={model}>
        <SidePanel.ToggleButton aria-label="Collapse View" />
        <SidePanel.Heading hidden size="small">
          Tasks Panel
        </SidePanel.Heading>
      </SidePanel>
      <main className={stylesOverride.main}>
        <Text as="p" typeLevel="body.large">
          Side Panel with a hidden title text.
        </Text>
      </main>
    </div>
  );
};
