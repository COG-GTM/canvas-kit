import {Skeleton} from '@workday/canvas-kit-react/skeleton';
import {calc, createStyles} from '@workday/canvas-kit-styling';
import {base, system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  display: 'flex',
  alignItems: 'center',
});

const shapeStyles = createStyles({
  width: system.size.md,
  height: system.size.md,
  borderRadius: system.shape.full,
  backgroundColor: base.indigo50,
});

const headerContainerStyles = createStyles({
  flex: 1,
  marginInlineStart: calc.add(system.gap.sm, system.gap.xs),
});

const headerStyles = createStyles({
  backgroundColor: base.amber50,
});

const textStyles = createStyles({
  backgroundColor: base.red25,
});

export const Color = () => {
  return (
    <Skeleton>
      <div className={containerStyles}>
        <Skeleton.Shape cs={shapeStyles} />
        <div className={headerContainerStyles}>
          <Skeleton.Header cs={headerStyles} />
        </div>
      </div>
      <div>
        <Skeleton.Text cs={textStyles} />
      </div>
    </Skeleton>
  );
};
