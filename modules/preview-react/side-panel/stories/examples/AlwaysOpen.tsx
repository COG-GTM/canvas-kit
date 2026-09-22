import {rocketIcon} from '@workday/canvas-accent-icons-web';
import {SidePanel, useSidePanel} from '@workday/canvas-kit-preview-react/side-panel';
import {AccentIcon} from '@workday/canvas-kit-react/icon';
import {Heading, Text} from '@workday/canvas-kit-react/text';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const accentIconStyles = createStyles({
  marginInlineEnd: system.gap.md,
});

const pageContainerStyles = createStyles({
  display: 'flex',
  gap: system.gap.md,
  height: px2rem(320),
});

const panelContainerStyles = createStyles({
  display: 'flex',
  alignItems: 'center',
  padding: system.padding.md,
});

const panelHeadingStyles = createStyles({
  color: system.color.fg.default,
});

const mainContentStyles = createStyles({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexBasis: 'auto',
  flex: 1,
});

export const AlwaysOpen = () => {
  const {panelProps, labelProps} = useSidePanel();

  return (
    <div className={pageContainerStyles}>
      <SidePanel {...panelProps}>
        <div className={panelContainerStyles}>
          <AccentIcon icon={rocketIcon} cs={accentIconStyles} />
          <Heading size="small" cs={panelHeadingStyles} {...labelProps}>
            Tasks Panel
          </Heading>
        </div>
      </SidePanel>
      <main className={mainContentStyles}>
        <Text as="p" typeLevel="body.large">
          This is the main content section.
        </Text>
      </main>
    </div>
  );
};
