import React from 'react';

import {StyledRadioButton} from '@workday/canvas-kit-preview-react/radio';
import {FormFieldGroup} from '@workday/canvas-kit-react/form-field';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  display: 'flex',
  flexDirection: 'column',
});

const radioRowStyles = createStyles({
  display: 'flex',
  gap: system.gap.xl,
});

const radioLabelStyles = createStyles({
  display: 'flex',
  gap: px2rem(12),
});

export const StandaloneRadio = () => {
  const [value, setValue] = React.useState<string | number>('deep-dish');

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.currentTarget;
    if (target instanceof HTMLInputElement) {
      setValue(target.value);
    }
  };

  return (
    <div className={containerStyles}>
      <FormFieldGroup as="fieldset">
        <FormFieldGroup.Label as="legend">Choose Your Pizza Crust</FormFieldGroup.Label>
        <div className={radioRowStyles}>
          <label className={radioLabelStyles}>
            <FormFieldGroup.Input
              as={StyledRadioButton}
              onChange={handleChange}
              value="deep-dish"
              name="pizza-crust-standalone"
              checked={value === 'deep-dish'}
            />
            Deep dish
          </label>
          <label className={radioLabelStyles}>
            <FormFieldGroup.Input
              as={StyledRadioButton}
              onChange={handleChange}
              value="gluten-free"
              checked={value === 'gluten-free'}
              name="pizza-crust-standalone"
            />
            Gluten free
          </label>
        </div>
      </FormFieldGroup>
      Value selected: {value}
    </div>
  );
};
