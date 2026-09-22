import {Skeleton} from '@workday/canvas-kit-react/skeleton';
import {calc, createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  display: 'flex',
  alignItems: 'center',
});

const shapeStyles = createStyles({
  width: system.size.md,
  height: system.size.md,
  borderRadius: system.shape.full,
});

const headerContainerStyles = createStyles({
  flex: 1,
  marginInlineStart: calc.add(system.gap.sm, system.gap.xs),
});

export const Basic = () => {
  return (
    <Skeleton>
      <div className={containerStyles}>
        <Skeleton.Shape cs={shapeStyles} />
        <div className={headerContainerStyles}>
          <Skeleton.Header />
        </div>
      </div>
      <Skeleton.Text />
    </Skeleton>
  );
};
