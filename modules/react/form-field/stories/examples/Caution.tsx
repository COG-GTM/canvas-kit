import React from 'react';

import {FormField} from '@workday/canvas-kit-react/form-field';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {createStyles} from '@workday/canvas-kit-styling';

const containerStyles = createStyles({
  display: 'flex',
});

export const Caution = () => {
  const [value, setValue] = React.useState('hi');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={containerStyles}>
      <FormField error="caution">
        <FormField.Label>Create Password</FormField.Label>
        <FormField.Field>
          <FormField.Input as={TextInput} type="password" value={value} onChange={handleChange} />
          <FormField.Hint>
            Alert: Password strength is weak, using more characters is recommended.
          </FormField.Hint>
        </FormField.Field>
      </FormField>
    </div>
  );
};
