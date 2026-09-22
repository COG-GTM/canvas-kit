import {Hyperlink} from '@workday/canvas-kit-react/button';
import {
  ComponentStatesTable,
  StaticStates,
  permutateProps,
} from '@workday/canvas-kit-react/testing';
import {createStencil, createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

import {Container} from './utils';

const textStyles = createStyles({
  ...system.type.subtext.lg,
});

const textColorStencil = createStencil({
  base: {},
  modifiers: {
    inverse: {
      true: {color: system.color.fg.inverse},
    },
  },
});

export default {
  title: 'Testing/Buttons/Button/Hyperlink',
  component: Hyperlink,
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

export const HyperlinkStates = {
  render: () => (
    <StaticStates>
      <ComponentStatesTable
        rowProps={permutateProps({
          variant: [
            {label: 'Default', value: undefined},
            {label: 'Inverse', value: 'inverse'},
            {label: 'Secondary', value: 'secondary'},
          ],
          linkType: [
            {label: 'Inline', value: undefined},
            {label: 'Standalone', value: 'standalone'},
          ],
        })}
        columnProps={permutateProps({
          className: [
            {label: 'Default', value: ''},
            {label: 'Hover', value: 'hover'},
            {label: 'Focus', value: 'focus'},
            {label: 'Focus Hover', value: 'focus hover'},
            {label: 'Active', value: 'active'},
            {label: 'Active Hover', value: 'active hover'},
            {label: 'Visited', value: 'visited'},
          ],
        })}
      >
        {(props: any) => (
          <Container blue={props.variant === 'inverse'}>
            <div className={textStyles}>
              <span {...textColorStencil({inverse: props.variant === 'inverse'})}>
                Here's a <Hyperlink {...props}>Link</Hyperlink> to something
              </span>
            </div>
          </Container>
        )}
      </ComponentStatesTable>
    </StaticStates>
  ),
};
