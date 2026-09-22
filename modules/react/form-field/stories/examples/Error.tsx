import React from 'react';

import {FormField} from '@workday/canvas-kit-react/form-field';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {createStyles} from '@workday/canvas-kit-styling';

const containerStyles = createStyles({
  display: 'flex',
});

export const Error = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={containerStyles}>
      <FormField error="error">
        <FormField.Label>Password</FormField.Label>
        <FormField.Field>
          <FormField.Input as={TextInput} type="password" value={value} onChange={handleChange} />
          <FormField.Hint>Error: Must Contain a number and a capital letter</FormField.Hint>
        </FormField.Field>
      </FormField>
    </div>
  );
};
