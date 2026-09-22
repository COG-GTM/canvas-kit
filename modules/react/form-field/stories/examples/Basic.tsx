import React from 'react';

import {FormField} from '@workday/canvas-kit-react/form-field';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {createStyles} from '@workday/canvas-kit-styling';

const containerStyles = createStyles({
  display: 'flex',
});

export const Basic = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={containerStyles}>
      <FormField>
        <FormField.Label>First Name</FormField.Label>
        <FormField.Field>
          <FormField.Input as={TextInput} value={value} onChange={handleChange} />
        </FormField.Field>
      </FormField>
    </div>
  );
};
