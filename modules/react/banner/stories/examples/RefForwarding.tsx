import React from 'react';

import {Banner} from '@workday/canvas-kit-react/banner';
import {SecondaryButton} from '@workday/canvas-kit-react/button';
import {changeFocus} from '@workday/canvas-kit-react/common';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  display: 'flex',
  gap: system.space.x3,
  alignItems: 'flex-start',
  flexDirection: 'column',
});

export const RefForwarding = () => {
  const bannerRef = React.useRef<HTMLButtonElement>(null);

  const focusBanner = () => {
    changeFocus(bannerRef.current);
  };

  return (
    <div className={containerStyles}>
      <Banner ref={bannerRef}>
        <Banner.Icon />
        <Banner.Label>3 Warnings</Banner.Label>
        <Banner.ActionText />
      </Banner>
      <SecondaryButton onClick={focusBanner}>Focus Banner</SecondaryButton>
    </div>
  );
};
