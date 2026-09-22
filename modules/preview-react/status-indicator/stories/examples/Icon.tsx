import {StatusIndicator} from '@workday/canvas-kit-preview-react/status-indicator';
import {createStyles} from '@workday/canvas-kit-styling';
import {cloudArrowUpIcon} from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';

const parentContainerStyles = createStyles({
  display: 'flex',
  gap: system.gap.md,
});

export const Icon = () => {
  return (
    <div className={parentContainerStyles}>
      <StatusIndicator>
        <StatusIndicator.Icon icon={cloudArrowUpIcon} />
        <StatusIndicator.Label>Unpublished</StatusIndicator.Label>
      </StatusIndicator>
      <StatusIndicator variant="positive">
        <StatusIndicator.Label>published</StatusIndicator.Label>
        <StatusIndicator.Icon icon={cloudArrowUpIcon} />
      </StatusIndicator>
    </div>
  );
};
