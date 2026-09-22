import React from 'react';

import {DeleteButton} from '@workday/canvas-kit-react/button';
import {useUniqueId} from '@workday/canvas-kit-react/common';
import {Modal} from '@workday/canvas-kit-react/modal';
import {
  useAssistiveHideSiblings,
  useDisableBodyScroll,
  useFocusTrap,
  useInitialFocus,
  usePopupModel,
  useReturnFocus,
} from '@workday/canvas-kit-react/popup';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const bodyTextStyles = createStyles({
  marginBlock: system.space.zero,
});

export const WithoutCloseIcon = () => {
  const longDescId = useUniqueId();
  const cancelBtnRef = React.useRef(null);
  const model = usePopupModel({
    initialFocusRef: cancelBtnRef,
  });

  // disable useCloseOnEscape and useCloseOnOverlayClick
  useInitialFocus(model);
  useReturnFocus(model);
  useFocusTrap(model);
  useAssistiveHideSiblings(model);
  useDisableBodyScroll(model);
  const handleDelete = () => {
    console.log('Deleted item');
  };

  return (
    <Modal model={model}>
      <Modal.Target as={DeleteButton}>Delete Item</Modal.Target>
      <Modal.Overlay>
        <Modal.Card aria-describedby={longDescId}>
          <Modal.Heading>Delete Item</Modal.Heading>
          <Modal.Body>
            <p id={longDescId} className={bodyTextStyles}>
              Are you sure you want to delete the item?
            </p>
          </Modal.Body>
          <Modal.ButtonGroup>
            <Modal.CloseButton ref={cancelBtnRef}>Cancel</Modal.CloseButton>
            <Modal.CloseButton as={DeleteButton} onClick={handleDelete}>
              Delete
            </Modal.CloseButton>
          </Modal.ButtonGroup>
        </Modal.Card>
      </Modal.Overlay>
    </Modal>
  );
};
