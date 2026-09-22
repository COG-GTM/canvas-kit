import React from 'react';

import {
  FormField,
  useFormFieldInput,
  useFormFieldModel,
} from '@workday/canvas-kit-react/form-field';
import {SystemIcon} from '@workday/canvas-kit-react/icon';
import {InputGroup, TextInput} from '@workday/canvas-kit-react/text-input';
import {createStyles} from '@workday/canvas-kit-styling';
import {searchIcon} from '@workday/canvas-system-icons-web';

/**
 * Using `as={InputGroup}` on `FormField.Input` will break the label associations necessary for accessibility.
 * In this example, we've rendered `FormField.Field` as `InputGroup` and then hoisted the `id` of the input from the FormField model.
 * This allows us to set the `id` of the `InputGroup.Input` correctly for proper label association.
 */

const containerStyles = createStyles({
  display: 'flex',
});

export const HiddenLabel = () => {
  const [value, setValue] = React.useState('');
  const model = useFormFieldModel();
  const {id: formFieldInputId} = useFormFieldInput(model);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={containerStyles}>
      <FormField model={model}>
        <FormField.Label isHidden>Search</FormField.Label>
        <FormField.Field as={InputGroup}>
          <InputGroup.InnerStart>
            <SystemIcon icon={searchIcon} size="small" />
          </InputGroup.InnerStart>
          <InputGroup.Input
            as={TextInput}
            id={formFieldInputId}
            onChange={handleChange}
            value={value}
          />
        </FormField.Field>
      </FormField>
    </div>
  );
};
