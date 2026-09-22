import React from 'react';

import {useUniqueId} from '@workday/canvas-kit-react/common';
import {Radio, RadioGroup} from '@workday/canvas-kit-react/radio';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  padding: system.padding.md,
  backgroundColor: system.color.accent.info,
});

export const Inverse = () => {
  const [value, setValue] = React.useState<string | number>('deep-dish');

  const handleChange = (value: string | number) => {
    setValue(value);
  };

  return (
    <div className={containerStyles}>
      <RadioGroup name={useUniqueId()} onChange={handleChange} value={value}>
        <Radio variant="inverse" label="Deep dish" value="deep-dish" />
        <Radio variant="inverse" label="Thin" value="thin" />
        <Radio variant="inverse" label="Gluten free" value="gluten-free" />
        <Radio variant="inverse" label="Cauliflower" value="cauliflower" />
      </RadioGroup>
    </div>
  );
};
