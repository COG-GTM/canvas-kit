import {getTheme} from '@workday/canvas-kit-react/common';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';
import {base, system} from '@workday/canvas-tokens-web';

const theme = getTheme();
const {up, down} = theme.canvas.breakpoints;
const small = down('m'); // Returns '@media (max-width: 767.5px)'
const medium = up('m'); // Returns '@media (min-width: 768px)'

const parentContainerStyles = createStyles({
  boxSizing: 'border-box',
  position: 'relative',
  [small]: {
    maxWidth: '100%',
  },
  [medium]: {
    maxWidth: px2rem(1000),
  },
});

const parentWrapperStyles = createStyles({
  boxSizing: 'border-box',
  display: 'grid',
  gap: system.space.x4,
  position: 'relative',
  [small]: {
    gridTemplateAreas: "'Header' 'SmallContainer' 'BodyContent' 'Footer'",
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
    border: `${px2rem(10)} solid`,
    borderRadius: px2rem(30),
    paddingInline: system.space.x4,
    paddingBlock: system.space.x8,
  },
  [medium]: {
    gridTemplateAreas: "'Header Header' 'SmallContainer BodyContent' 'Footer Footer'",
    gridTemplateColumns: '1fr 3fr',
    gridTemplateRows: `auto ${px2rem(300)} auto`,
    border: `${px2rem(40)} solid`,
    borderRadius: `${px2rem(20)} ${px2rem(20)} 0 0`,
    padding: system.space.x6,
  },
});

const circleTopStyles = createStyles({
  boxSizing: 'border-box',
  backgroundColor: 'black',
  borderRadius: system.shape.round,
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, 0)',
  [small]: {
    height: px2rem(15),
    width: px2rem(40),
    top: px2rem(10),
  },
  [medium]: {
    display: 'none',
  },
});

const headerContainerStyles = createStyles({
  boxSizing: 'border-box',
  display: 'grid',
  gridArea: 'Header',
  backgroundColor: base.blueberry400,
  borderRadius: system.shape.x1,
  padding: system.space.x4,
});

const leftContentStyles = createStyles({
  boxSizing: 'border-box',
  display: 'grid',
  gridArea: 'SmallContainer',
  backgroundColor: base.blueberry300,
  borderRadius: system.shape.x1,
  padding: system.space.x4,
});

const rightContentStyles = createStyles({
  boxSizing: 'border-box',
  display: 'grid',
  gridArea: 'BodyContent',
  backgroundColor: base.plum300,
  borderRadius: system.shape.x1,
  padding: system.space.x4,
});

const footerContainerStyles = createStyles({
  boxSizing: 'border-box',
  display: 'grid',
  gridArea: 'Footer',
  backgroundColor: base.berrySmoothie300,
  borderRadius: system.shape.x1,
  padding: system.space.x4,
});

const headingStyles = createStyles({
  boxSizing: 'border-box',
  margin: system.space.zero,
  [small]: {
    ...system.type.body.small,
    color: base.frenchVanilla100,
    fontWeight: system.fontWeight.bold,
  },
  [medium]: {
    ...system.type.body.large,
    color: base.frenchVanilla100,
    fontWeight: system.fontWeight.bold,
  },
});

const greyBarStyles = createStyles({
  boxSizing: 'border-box',
  height: px2rem(70),
  backgroundColor: 'grey',
  [small]: {
    display: 'none',
  },
  [medium]: {
    display: 'block',
    borderRadius: `0 0 ${px2rem(20)} ${px2rem(20)}`,
  },
});

const circleStyles = createStyles({
  boxSizing: 'border-box',
  borderRadius: system.shape.round,
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, 0)',
  [small]: {
    height: px2rem(5),
    width: px2rem(75),
    bottom: px2rem(10),
    backgroundColor: 'grey',
  },
  [medium]: {
    height: px2rem(40),
    width: px2rem(40),
    bottom: px2rem(-95),
    backgroundColor: 'black',
  },
});

export const ResponsiveViewport = () => {
  return (
    <div className={parentContainerStyles}>
      <section className={parentWrapperStyles}>
        <div className={circleTopStyles}></div>
        <div className={headerContainerStyles}>
          <h3 className={headingStyles}>Header</h3>
        </div>
        <div className={leftContentStyles}>
          <h3 className={headingStyles}>Small Content</h3>
        </div>
        <div className={rightContentStyles}>
          <h3 className={headingStyles}>Body Content</h3>
        </div>
        <div className={footerContainerStyles}>
          <h3 className={headingStyles}>Footer</h3>
        </div>
        <div className={circleStyles}></div>
      </section>
      <div className={greyBarStyles}></div>
    </div>
  );
};
