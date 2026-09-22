import React from 'react';

import {DeleteButton, SecondaryButton} from '@workday/canvas-kit-react/button';
import {
  Popup,
  useCloseOnEscape,
  useCloseOnOutsideClick,
  useFocusTrap,
  useInitialFocus,
  usePopupModel,
  useReturnFocus,
} from '@workday/canvas-kit-react/popup';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

import {CloseOnTargetHiddenTest as CloseOnTargetHiddenTestExample} from './examples/CloseOnTargetHiddenTest';
import {ComboboxWithinPopup as ComboboxWithinPopupExample} from './examples/ComboboxWithinPopup';
import {MixedPopupTypes as MixedPopupTypesExample} from './examples/MixedPopupTypes';
import {PopupWithNonHidablePopup as PopupWithNonHidablePopupExample} from './examples/PopupWithNonHidablePopup';
import {ReturnFocusTest as ReturnFocusTestExample} from './examples/ReturnFocusTest';
import {TooltipReturnFocus as TooltipReturnFocusExample} from './examples/TooltipReturnFocus';

const containerStyles = createStyles({
  display: 'flex',
  gap: system.gap.md,
});

const hiddenOwnerStyles = createStyles({
  position: 'absolute',
});

const cardStyles = createStyles({
  width: px2rem(400),
  padding: system.padding.md,
});

export default {
  title: 'Testing/Popups/Popup',
  component: Popup,
};

export const MixedPopupTypes = {
  render: MixedPopupTypesExample,
};

export const PopupWithNonHidablePopup = {
  render: PopupWithNonHidablePopupExample,
};

export const PopupWithBodyScroll = {
  render: () => {
    const model = usePopupModel();

    useCloseOnOutsideClick(model);
    useCloseOnEscape(model);
    useInitialFocus(model);
    useReturnFocus(model);
    useFocusTrap(model);

    const popupId = 'popup-test-id';
    const visible = model.state.visibility !== 'hidden';
    React.useLayoutEffect(() => {
      if (visible && model.state.stackRef.current) {
        model.state.stackRef.current.setAttribute('id', popupId);
      }
    }, [model.state.stackRef, visible]);

    return (
      <Popup model={model}>
        <div>
          <p>Scroll down and click on "Delete Item". The browser should not scroll.</p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <div className={containerStyles}>
          <Popup.Target as={DeleteButton}>Delete Item</Popup.Target>
          <div aria-owns={popupId} className={hiddenOwnerStyles} />
          <Popup.Popper>
            <Popup.Card cs={cardStyles}>
              <Popup.CloseIcon aria-label="Close" />
              <Popup.Heading>Delete Item</Popup.Heading>
              <Popup.Body>
                <p>Are you sure you'd like to delete the item titled 'My Item'?</p>
              </Popup.Body>
              <div className={containerStyles}>
                <Popup.CloseButton as={DeleteButton}>Delete</Popup.CloseButton>
                <Popup.CloseButton>Cancel</Popup.CloseButton>
              </div>
            </Popup.Card>
          </Popup.Popper>
          <SecondaryButton>Next Focusable Button</SecondaryButton>
          <SecondaryButton>Focusable Button After Popup</SecondaryButton>
        </div>
      </Popup>
    );
  },
};

export const TooltipReturnFocus = {
  render: TooltipReturnFocusExample,
};

export const ComboboxWithinPopup = {
  render: ComboboxWithinPopupExample,
};

export const ReturnFocusTest = {
  render: ReturnFocusTestExample,
};

export const CloseOnTargetHiddenTest = {
  render: CloseOnTargetHiddenTestExample,
};
