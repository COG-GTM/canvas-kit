import * as React from 'react';

import {
  SidePanel,
  SidePanelTransitionStates,
  useSidePanelModel,
} from '@workday/canvas-kit-react/side-panel';
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

export const OnStateTransition = () => {
  const [transitionState, setTransitionState] =
    React.useState<SidePanelTransitionStates>('expanded');

  const model = useSidePanelModel({
    onStateTransition: state => {
      setTransitionState(state);
      console.log('Expanded changed to:', state);
    },
  });

  return (
    <div className={stylesOverride.viewport}>
      <SidePanel model={model}>
        <SidePanel.ToggleButton aria-label="Collapse View" />
        <SidePanel.Heading hidden size="small">
          Hidden Title
        </SidePanel.Heading>
      </SidePanel>
      <main className={stylesOverride.main}>
        <Text as="p" typeLevel="body.large">
          Side panel is {transitionState}.
        </Text>
      </main>
    </div>
  );
};
