import {SecondaryButton} from '@workday/canvas-kit-react/button';
import {SidePanel, useSidePanelModel} from '@workday/canvas-kit-react/side-panel';
import {Text} from '@workday/canvas-kit-react/text';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const stylesOverride = {
  viewport: createStyles({
    display: 'flex',
    height: px2rem(320),
  }),
  panel: createStyles({
    display: 'flex',
    alignItems: 'center',
    padding: system.padding.md,
  }),
  panelHeading: createStyles({
    color: system.color.fg.muted.strong,
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

export const ExternalControl = () => {
  const model = useSidePanelModel({
    initialTransitionState: 'collapsed',
    labelId: 'tasks-panel-label',
  });

  return (
    <div className={stylesOverride.viewport}>
      <SidePanel model={model}>
        <SidePanel.ToggleButton aria-label="Collapse View" />
        <SidePanel.Heading size="small" cs={stylesOverride.panelHeading}>
          Task Panel
        </SidePanel.Heading>
        {model.state.transitionState === 'expanded' && (
          <div className={stylesOverride.panel}>Contents</div>
        )}
      </SidePanel>
      <main className={stylesOverride.main}>
        <Text as="p" typeLevel="body.large">
          Control the panel externally
        </Text>
        <SecondaryButton
          onClick={
            model.state.transitionState === 'expanded' ? model.events.collapse : model.events.expand
          }
          aria-pressed={model.state.transitionState === 'expanded'}
        >
          {model.state.transitionState === 'expanded' ? 'Hide Side Panel' : 'Show Side Panel'}
        </SecondaryButton>
      </main>
    </div>
  );
};
