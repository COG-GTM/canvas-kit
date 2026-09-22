import {Banner} from '@workday/canvas-kit-react/banner';
import {CanvasProvider} from '@workday/canvas-kit-react/common';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  position: 'absolute',
  right: 0,
});

const wrapperStyles = createStyles({
  height: system.size.xxl,
});

export const StickyRTL = () => {
  return (
    <CanvasProvider dir="rtl">
      <div className={wrapperStyles}>
        <Banner isSticky={true} cs={containerStyles}>
          <Banner.Icon />
          <Banner.Label>3 אזהרות</Banner.Label>
          <Banner.ActionText />
        </Banner>
      </div>
    </CanvasProvider>
  );
};
