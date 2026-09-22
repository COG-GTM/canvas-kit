import React from 'react';

import {PrimaryButton} from '@workday/canvas-kit-react/button';
import {Dialog} from '@workday/canvas-kit-react/dialog';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  display: 'flex',
  gap: system.gap.lg,
});

const headingStyles = createStyles({
  paddingBlockStart: system.padding.md,
});

export const Focus = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleEmail = () => {
    console.log('Email Submitted');
  };

  return (
    <div className={containerStyles}>
      <Dialog>
        <Dialog.Target as={PrimaryButton}>Open for Offer</Dialog.Target>
        <Dialog.Popper>
          <Dialog.Card>
            <Dialog.CloseIcon aria-label="Close" />
            <Dialog.Heading cs={headingStyles}>Sign Up for 15% Off Your Next Order</Dialog.Heading>
            <Dialog.Body>
              <FormField>
                <FormField.Label>Email</FormField.Label>
                <FormField.Input as={TextInput} grow onChange={handleChange} value={value} />
              </FormField>
            </Dialog.Body>
            <Dialog.ButtonGroup>
              <Dialog.CloseButton>Cancel</Dialog.CloseButton>
              <Dialog.CloseButton as={PrimaryButton} onClick={handleEmail}>
                Submit
              </Dialog.CloseButton>
            </Dialog.ButtonGroup>
          </Dialog.Card>
        </Dialog.Popper>
      </Dialog>
      <PrimaryButton>Focus #1</PrimaryButton>
      <PrimaryButton>Focus #2</PrimaryButton>
    </div>
  );
};
