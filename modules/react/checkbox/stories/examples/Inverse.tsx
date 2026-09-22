import React from 'react';

import {Checkbox} from '@workday/canvas-kit-react/checkbox';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  display: 'flex',
  backgroundColor: system.color.surface.contrast.default,
  padding: system.padding.md,
});

export const Inverse = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className={containerStyles}>
      <Checkbox
        variant="inverse"
        checked={checked}
        label="I agree to the terms"
        onChange={handleChange}
      />
    </div>
  );
};
