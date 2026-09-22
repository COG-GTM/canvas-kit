import * as React from 'react';

import {ExtractProps, createComponent} from '@workday/canvas-kit-react/common';
import {Heading} from '@workday/canvas-kit-react/text';
import {CSProps, createStyles, handleCsProp, px2rem} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

// Extend Heading Props and omitting size since we've added a default
interface CardHeadingProps extends Omit<ExtractProps<typeof Heading>, 'size'> {}
export const CardHeading = createComponent('h2')({
  displayName: 'CardHeading',
  Component: ({children, ...elemProps}: CardHeadingProps, ref, Element) => {
    return (
      <Heading size="medium" as={Element} ref={ref} {...elemProps}>
        {children}
      </Heading>
    );
  },
});

const cardBaseStyles = createStyles({
  boxSizing: 'border-box',
});

// Extend `CSProps` so consumers can style the card with the `cs` prop
interface CardProps extends CSProps {
  children?: React.ReactNode;
}
export const Card = createComponent('div')({
  displayName: 'Card',
  subComponents: {
    Heading: CardHeading,
  },
  Component: ({children, ...elemProps}: CardProps, ref, Element) => {
    return (
      <Element ref={ref} {...handleCsProp(elemProps, cardBaseStyles)}>
        {children}
      </Element>
    );
  },
});

const cardStyles = createStyles({
  boxShadow: system.depth[2],
  border: `${px2rem(1)} solid ${system.color.border.default}`,
  padding: system.padding.sm,
});

export const CreateComponent = () => {
  return (
    <Card cs={cardStyles} as="section">
      <Card.Heading>Card Heading</Card.Heading>
    </Card>
  );
};
