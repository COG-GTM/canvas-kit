import React from 'react';

import {PrimaryButton} from '@workday/canvas-kit-react/button';
import {useUniqueId} from '@workday/canvas-kit-react/common';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {Modal, useModalModel} from '@workday/canvas-kit-react/modal';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const descriptionStyles = createStyles({
  marginBlockStart: system.space.zero,
  marginBlockEnd: system.gap.md,
});

export const CustomFocus = () => {
  const longDescID = useUniqueId();
  const ref = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState('');
  const model = useModalModel({
    initialFocusRef: ref,
  });

  const handleAcknowledge = () => {
    console.log('Acknowledged license');
  };

  return (
    <Modal model={model}>
      <Modal.Target as={PrimaryButton}>Acknowledge License</Modal.Target>
      <Modal.Overlay>
        <Modal.Card aria-describedby={longDescID}>
          <Modal.CloseIcon aria-label="Close" />
          <Modal.Heading>Acknowledge License</Modal.Heading>
          <Modal.Body>
            <p id={longDescID} className={descriptionStyles}>
              Enter your initials to acknowledge the license.
            </p>
            <FormField>
              <FormField.Label>Initials</FormField.Label>
              <FormField.Input
                as={TextInput}
                ref={ref}
                value={value}
                grow
                onChange={e => setValue(e.currentTarget.value)}
              />
            </FormField>
          </Modal.Body>
          <Modal.ButtonGroup>
            <Modal.CloseButton>Cancel</Modal.CloseButton>
            <Modal.CloseButton as={PrimaryButton} onClick={handleAcknowledge}>
              Acknowledge
            </Modal.CloseButton>
          </Modal.ButtonGroup>
        </Modal.Card>
      </Modal.Overlay>
    </Modal>
  );
};
