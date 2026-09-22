import {rocketIcon} from '@workday/canvas-expressive-icons-web';
import {ExpressiveIcon} from '@workday/canvas-kit-react/icon';
import {SidePanel} from '@workday/canvas-kit-react/side-panel';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const flexHeadingStyles = createStyles({
  display: 'flex',
  alignItems: 'center',
  gap: system.gap.sm,
});

const viewPortStyles = createStyles({
  display: 'flex',
  height: px2rem(320),
});

export const Basic = () => {
  return (
    <div className={viewPortStyles}>
      <SidePanel>
        <SidePanel.Heading>
          <div className={flexHeadingStyles}>
            <ExpressiveIcon icon={rocketIcon} size="xs" />
            Tasks Panel
          </div>
        </SidePanel.Heading>
        <SidePanel.ToggleButton aria-label="Collapse View" />
      </SidePanel>
    </div>
  );
};
