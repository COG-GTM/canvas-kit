import {SecondaryButton} from '@workday/canvas-kit-react/button';
import {CanvasProvider} from '@workday/canvas-kit-react/common';
import {SidePanel, useSidePanelModel} from '@workday/canvas-kit-react/side-panel';
import {Text} from '@workday/canvas-kit-react/text';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';

// local helper hook for setting content direction;
import {useDirection} from './useDirection';

const stylesOverride = {
  viewport: createStyles({
    display: 'flex',
    height: px2rem(320),
  }),
  panelContainer: createStyles({
    marginInlineStart: 'auto',
  }),
  panel: createStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
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

const RightPanel = () => {
  const model = useSidePanelModel({
    origin: 'end',
  });

  return (
    <SidePanel model={model} className={stylesOverride.panelContainer}>
      <SidePanel.ToggleButton aria-label="Collapse View" />
      <div className={stylesOverride.panel}>
        <SidePanel.Heading size="small">Tasks Panel</SidePanel.Heading>
      </div>
    </SidePanel>
  );
};

export const RightOrigin = () => {
  const {direction, toggleDirection} = useDirection();

  return (
    <CanvasProvider dir={direction}>
      <div className={stylesOverride.viewport}>
        <main className={stylesOverride.main}>
          <Text as="p" typeLevel="body.large">
            Toggle the content direction
          </Text>
          <SecondaryButton onClick={toggleDirection}>
            Set to {direction === 'ltr' ? 'Right-to-Left' : 'Left-to-Right'}
          </SecondaryButton>
        </main>

        <RightPanel />
      </div>
    </CanvasProvider>
  );
};
