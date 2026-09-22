import {Banner} from '@workday/canvas-kit-react/banner';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  position: 'absolute',
  right: 0,
});

const wrapperStyles = createStyles({
  height: system.size.xxl,
});

export const Sticky = () => {
  return (
    <div className={wrapperStyles}>
      <Banner hasError={true} isSticky={true} cs={containerStyles}>
        <Banner.Icon />
        <Banner.Label>3 Errors</Banner.Label>
        <Banner.ActionText />
      </Banner>
    </div>
  );
};
