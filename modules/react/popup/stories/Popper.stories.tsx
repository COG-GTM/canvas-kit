import * as React from 'react';

import {PrimaryButton, SecondaryButton} from '@workday/canvas-kit-react/button';
import {Card} from '@workday/canvas-kit-react/card';
import {Popper} from '@workday/canvas-kit-react/popup';
import {createStencil, createStyles, px2rem} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  display: 'flex',
  justifyContent: 'center',
});

const buttonContainerStyles = createStyles({
  display: 'flex',
  gap: system.gap.md,
});

const spacerStencil = createStencil({
  base: {},
  modifiers: {
    big: {
      true: {
        width: px2rem(500),
      },
    },
  },
});

export default {
  title: 'Components/Popups/Popper',
  component: Popper,
  parameters: {
    ReadmePath: 'react/popup',
  },
};

export const PopperStory = {
  name: 'Popper',
  render: () => {
    const [open, setOpen] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const popupRef = React.useRef<HTMLDivElement>(null);
    const popperInstanceRef = React.useRef(null);

    const onClickButton = () => setOpen(!open);
    const onClose = () => setOpen(false);
    const [big, setBig] = React.useState(false);

    return (
      <div className={containerStyles}>
        <PrimaryButton ref={buttonRef} onClick={onClickButton}>
          Toggle Popup
        </PrimaryButton>
        <Popper
          placement="bottom"
          open={open}
          anchorElement={buttonRef.current!}
          ref={popupRef}
          popperInstanceRef={popperInstanceRef}
        >
          <Card>
            <Card.Heading>Popper Example</Card.Heading>
            <Card.Body>
              <p>A card positioned by Popper!</p>
              <div {...spacerStencil({big})}></div>
              <div className={buttonContainerStyles}>
                <SecondaryButton
                  onClick={() => {
                    setBig(!big);
                    requestAnimationFrame(() => {
                      popperInstanceRef.current.update();
                    });
                  }}
                >
                  Toggle size
                </SecondaryButton>
                <SecondaryButton onClick={onClose}>Close</SecondaryButton>
              </div>
            </Card.Body>
          </Card>
        </Popper>
      </div>
    );
  },
};
