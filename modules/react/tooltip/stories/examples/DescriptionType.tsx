import {DeleteButton, SecondaryButton, TertiaryButton} from '@workday/canvas-kit-react/button';
import {Tooltip} from '@workday/canvas-kit-react/tooltip';
import {createStyles} from '@workday/canvas-kit-styling';
import {configureIcon} from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  display: 'flex',
  gap: system.gap.sm,
});

export const DescriptionType = () => {
  return (
    <div className={containerStyles}>
      <Tooltip type="description" title="Search using additional criteria">
        <TertiaryButton icon={configureIcon}>Advanced Search</TertiaryButton>
      </Tooltip>
      <Tooltip type="description" title="Create saved search">
        <SecondaryButton>Save</SecondaryButton>
      </Tooltip>
      <Tooltip type="description" title="The service will restart after this action">
        <DeleteButton>Delete</DeleteButton>
      </Tooltip>
    </div>
  );
};
