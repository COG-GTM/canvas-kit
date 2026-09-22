import React from 'react';

import {ExternalHyperlink} from '@workday/canvas-kit-react/button';
import {CanvasProvider} from '@workday/canvas-kit-react/common';
import {
  ComponentStatesTable,
  StaticStates,
  permutateProps,
} from '@workday/canvas-kit-react/testing';
import {BodyText, Subtext} from '@workday/canvas-kit-react/text';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

import {Container} from './utils';

const typographyContainerStyles = createStyles({
  display: 'flex',
  flexDirection: 'column',
  gap: system.gap.sm,
});

export default {
  title: 'Testing/Buttons/Button/ExternalHyperlink',
  component: ExternalHyperlink,
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

export const ExternalHyperlinkStates = {
  render: () => (
    <React.Fragment>
      <StaticStates>
        <ComponentStatesTable
          rowProps={permutateProps({
            variant: [
              {label: 'Default', value: undefined},
              {label: 'Inverse', value: 'inverse'},
              {label: 'Secondary', value: 'secondary'},
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
              <Subtext as="span" size="large" variant={props.variant}>
                Here's a{' '}
                <ExternalHyperlink {...props} iconLabel="Opens link in new window">
                  Link
                </ExternalHyperlink>{' '}
                to something
              </Subtext>
            </Container>
          )}
        </ComponentStatesTable>
      </StaticStates>
      <div className={typographyContainerStyles}>
        <h3>Typography</h3>
        <Subtext size="large">
          The quick{' '}
          <ExternalHyperlink iconLabel="Opens link in new window">brown fox</ExternalHyperlink>{' '}
          jumps over the lazy dog
        </Subtext>
        <BodyText size="small">
          The quick{' '}
          <ExternalHyperlink iconLabel="Opens link in new window">brown fox</ExternalHyperlink>{' '}
          jumps over the lazy dog
        </BodyText>
        <BodyText size="medium">
          The quick{' '}
          <ExternalHyperlink iconLabel="Opens link in new window">brown fox</ExternalHyperlink>{' '}
          jumps over the lazy dog
        </BodyText>
        <BodyText size="large">
          The quick{' '}
          <ExternalHyperlink iconLabel="Opens link in new window">brown fox</ExternalHyperlink>{' '}
          jumps over the lazy dog
        </BodyText>
      </div>
      <CanvasProvider dir="rtl">
        <div className={typographyContainerStyles}>
          <Subtext size="large">
            השועל החום{' '}
            <ExternalHyperlink iconLabel="Opens link in new window">המהיר</ExternalHyperlink> קופץ
            מעל הכלב העצל
          </Subtext>
          <BodyText size="small">
            השועל החום{' '}
            <ExternalHyperlink iconLabel="Opens link in new window">המהיר</ExternalHyperlink> קופץ
            מעל הכלב העצל
          </BodyText>
          <BodyText size="medium">
            השועל החום{' '}
            <ExternalHyperlink iconLabel="Opens link in new window">המהיר</ExternalHyperlink> קופץ
            מעל הכלב העצל
          </BodyText>
          <BodyText size="large">
            השועל החום{' '}
            <ExternalHyperlink iconLabel="Opens link in new window">המהיר</ExternalHyperlink> קופץ
            מעל הכלב העצל
          </BodyText>
        </div>
      </CanvasProvider>
    </React.Fragment>
  ),
};
