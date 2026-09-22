import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  display: 'flex',
});

const cardStyles = createStyles({
  ...system.type.body.md,
  boxShadow: system.depth[3],
  padding: system.padding.lg,
  borderRadius: system.shape.md,
  backgroundColor: system.color.accent.danger,
});

export const Overview = () => (
  <div className={containerStyles}>
    <div className={cardStyles}>Using Tokens To Style</div>
  </div>
);
