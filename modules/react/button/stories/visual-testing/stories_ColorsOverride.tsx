import {
  DeleteButton,
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  ToolbarDropdownButton,
  ToolbarIconButton,
} from '@workday/canvas-kit-react/button';
import {PartialEmotionCanvasTheme} from '@workday/canvas-kit-react/common';
import {
  ComponentStatesTable,
  StaticStates,
  permutateProps,
} from '@workday/canvas-kit-react/testing';
import {createStyles} from '@workday/canvas-kit-styling';
import {playCircleIcon} from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';

import {customColorTheme, withSnapshotsEnabled} from '../../../../../utils/storybook';
import {stateTableColumnProps} from './utils';

export default withSnapshotsEnabled({
  title: 'Testing/Buttons/Button/Color Overrides',
});

const colorOverrideContainerStyles = createStyles({
  display: 'flex',
  flexDirection: 'column',
  gap: system.gap.md,
  alignItems: 'center',
});

const ColorOverrideContainer = props => {
  return <div className={colorOverrideContainerStyles}>{props.children}</div>;
};

const ColorOverrideStates = (props: {theme?: PartialEmotionCanvasTheme}) => (
  <StaticStates theme={props.theme}>
    <ComponentStatesTable
      rowProps={permutateProps(
        {
          size: [{value: 'medium', label: 'Medium'}],
          icon: [
            {value: undefined, label: ''},
            // We don't need a label here, because `iconPosition` provides it
            {value: playCircleIcon, label: ''},
          ],
          iconPosition: [{value: 'start', label: '& Icon Start'}],
        },
        // Filter out permutations where `iconPosition` is provided and not `icon`, and vice versa
        props => (props.iconPosition && props.icon) || (!props.icon && !props.iconPosition)
      )}
      columnProps={stateTableColumnProps}
    >
      {props => (
        <>
          <ColorOverrideContainer>
            <PrimaryButton {...props}>Test</PrimaryButton>

            <SecondaryButton {...props}>Test</SecondaryButton>

            <TertiaryButton {...props}>Test</TertiaryButton>

            <DeleteButton {...props}>Test</DeleteButton>

            <ToolbarDropdownButton icon={playCircleIcon} {...props} />

            <ToolbarIconButton icon={playCircleIcon} {...props} />
          </ColorOverrideContainer>
        </>
      )}
    </ComponentStatesTable>
  </StaticStates>
);

export const ColorOverrideThemedStates = () => (
  <ColorOverrideStates theme={{canvas: customColorTheme}} />
);
