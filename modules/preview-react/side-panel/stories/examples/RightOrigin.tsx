import {SidePanel, useSidePanel} from '@workday/canvas-kit-preview-react/side-panel';
import {SecondaryButton} from '@workday/canvas-kit-react/button';
import {CanvasProvider} from '@workday/canvas-kit-react/common';
import {Heading, Text} from '@workday/canvas-kit-react/text';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

// local helper hook for setting content direction;
import {useDirection} from './useDirection';

const viewportStyles = createStyles({
  display: 'flex',
  height: px2rem(320),
});

const panelContainerStyles = createStyles({
  marginInlineStart: 'auto',
});

const panelStyles = createStyles({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: system.padding.md,
});

const mainStyles = createStyles({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  flex: 1,
  flexBasis: 'auto',
});

const RightPanel = () => {
  const {expanded, panelProps, labelProps, controlProps} = useSidePanel();

  return (
    <SidePanel {...panelProps} origin="right" className={panelContainerStyles}>
      <SidePanel.ToggleButton {...controlProps} />
      <div className={panelStyles}>
        <Heading size="small" hidden={!expanded ? true : undefined} {...labelProps}>
          Tasks Panel
        </Heading>
      </div>
    </SidePanel>
  );
};

export const RightOrigin = () => {
  const {direction, toggleDirection} = useDirection();

  return (
    <CanvasProvider dir={direction}>
      <div className={viewportStyles}>
        <main className={mainStyles}>
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
