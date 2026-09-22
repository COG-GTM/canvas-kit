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
  backgroundColor: system.color.bg.alt.default,
});

const panelStyles = createStyles({
  display: 'flex',
  alignItems: 'center',
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

export const AlternatePanel = () => {
  const {direction, toggleDirection} = useDirection();
  const {expanded, panelProps, labelProps, controlProps} = useSidePanel();

  return (
    <CanvasProvider dir={direction}>
      <div className={viewportStyles}>
        <SidePanel {...panelProps} variant="alternate">
          <SidePanel.ToggleButton {...controlProps} />
          <div className={panelStyles}>
            <Heading size="small" hidden={!expanded ? true : undefined} {...labelProps}>
              Alternate Panel
            </Heading>
          </div>
        </SidePanel>
        <main className={mainStyles}>
          <Text as="p" typeLevel="body.large">
            Toggle the content direction
          </Text>
          <SecondaryButton onClick={toggleDirection}>
            Set to {direction === 'ltr' ? 'Right-to-Left' : 'Left-to-Right'}
          </SecondaryButton>
        </main>
      </div>
    </CanvasProvider>
  );
};
