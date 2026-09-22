import * as React from 'react';

import {PrimaryButton} from '@workday/canvas-kit-react/button';
import {createComponent} from '@workday/canvas-kit-react/common';
import {Modal} from '@workday/canvas-kit-react/modal';
import {Text} from '@workday/canvas-kit-react/text';
import {
  CSProps,
  calc,
  createStencil,
  createStyles,
  handleCsProp,
  px2rem,
} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const mediaImageStencil = createStencil({
  base: {
    backgroundColor: system.color.bg.default,
    transition: 'opacity ease 200ms',
    display: 'block',
    width: '100%',
    height: px2rem(293),
    opacity: 0,
  },
  modifiers: {
    loaded: {
      true: {
        opacity: 1,
      },
    },
  },
});

const MediaImage = createComponent('img')({
  displayName: 'Media.Image',
  Component: (elemProps: React.ImgHTMLAttributes<HTMLImageElement>, ref, Element) => {
    const [loaded, setLoaded] = React.useState(false);

    return (
      <Element
        ref={ref}
        onLoad={() => setLoaded(true)}
        {...handleCsProp(elemProps, mediaImageStencil({loaded}))}
      />
    );
  },
});

const bodyTextStyles = createStyles({
  marginBlockStart: 0,
  marginBlockEnd: system.gap.lg,
});

const actionsStyles = createStyles({
  display: 'flex',
  gap: system.gap.md,
});

const mediaStyles = createStyles({
  width: calc.add('100%', calc.multiply(system.size.sm, 2)),
  marginInlineStart: calc.negate(system.gap.xl),
  marginBlockStart: system.gap.lg,
  marginBlockEnd: system.gap.md,
});

const Media = createComponent('div')({
  displayName: 'Media',
  subComponents: {Image: MediaImage},
  Component: (
    {children, ...elemProps}: React.HTMLAttributes<HTMLDivElement> & CSProps,
    ref,
    Element
  ) => {
    return (
      <Element ref={ref} {...handleCsProp(elemProps, mediaStyles)}>
        {children}
      </Element>
    );
  },
});

export const BasicExample = () => {
  return (
    <Modal>
      <Modal.Target>Open Media Modal</Modal.Target>
      <Modal.Overlay>
        <Modal.Card>
          <Modal.CloseIcon aria-label="Close" size="small" />
          <Media>
            <Media.Image
              src="https://www.theuiaa.org/wp-content/uploads/2017/11/RTM19-banner-web.jpg"
              alt="Sunrise in the mountains"
            />
          </Media>
          <Modal.Heading>TED's Secret to Public Speaking</Modal.Heading>
          <Modal.Body>
            <Text as="p" cs={bodyTextStyles}>
              The secret to great public speaking, according to former actor Martin Danielson, is as
              simple as one, two, three.
            </Text>
            <div className={actionsStyles}>
              <Modal.CloseButton as={PrimaryButton}>Learn More</Modal.CloseButton>
            </div>
          </Modal.Body>
        </Modal.Card>
      </Modal.Overlay>
    </Modal>
  );
};
