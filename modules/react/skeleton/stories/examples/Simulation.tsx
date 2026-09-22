import {keyframes} from '@emotion/react';
import React from 'react';

import {SecondaryButton} from '@workday/canvas-kit-react/button';
import {Card} from '@workday/canvas-kit-react/card';
import {Checkbox} from '@workday/canvas-kit-react/checkbox';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {SystemIconCircle} from '@workday/canvas-kit-react/icon';
import {Skeleton} from '@workday/canvas-kit-react/skeleton';
import {Heading} from '@workday/canvas-kit-react/text';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {calc, createStencil, createStyles, px2rem} from '@workday/canvas-kit-styling';
import {patternIcon} from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const overlayStencil = createStencil({
  base: {
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  modifiers: {
    loading: {
      true: {
        animation: `${fadeOut} 150ms ease-out forwards`,
      },
    },
  },
});

const controlsStyles = createStyles({
  marginBlockEnd: system.gap.xl,
});

const contentStyles = createStyles({
  minHeight: px2rem(180),
  position: 'relative',
});

const skeletonRowStyles = createStyles({
  display: 'flex',
  alignItems: 'center',
});

const skeletonShapeStyles = createStyles({
  width: system.size.md,
  height: system.size.md,
  borderRadius: system.shape.full,
});

const skeletonHeaderContainerStyles = createStyles({
  flex: 1,
  marginInlineStart: calc.add(system.gap.sm, system.gap.xs),
});

const headingRowStyles = createStyles({
  marginBlockEnd: calc.add(system.gap.sm, system.gap.xs),
  display: 'inline-flex',
  alignItems: 'center',
});

const headingStyles = createStyles({
  margin: 0,
  marginInlineStart: system.gap.sm,
});

export const Simulation = () => {
  const [loading, setLoading] = React.useState(true);
  const [loadTime, setLoadTime] = React.useState('3000');
  const timer = React.useRef(0);
  const loadTimeValue = React.useRef(parseFloat(loadTime));

  const resetTimeout = () => {
    setLoading(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setLoading(false);
    }, loadTimeValue.current);
    return () => {
      window.clearTimeout(timer.current);
    };
  };

  const onChangeLoading = (event: React.ChangeEvent<HTMLInputElement>) => {
    window.clearTimeout(timer.current);
    setLoading(event.target.checked);
  };

  const onChangeLoadTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoadTime(event.currentTarget.value);
    const value = parseInt(event.currentTarget.value, 10);

    if (value) {
      loadTimeValue.current = value;
    }
  };

  React.useEffect(resetTimeout, []);

  return (
    <div>
      <div className={controlsStyles}>
        <FormField orientation="horizontalStart">
          <FormField.Label>Load Time</FormField.Label>
          <FormField.Input as={TextInput} onChange={onChangeLoadTime} value={loadTime} />
        </FormField>
        <FormField orientation="horizontalStart">
          <FormField.Label>Loading</FormField.Label>
          <FormField.Input as={Checkbox} checked={loading} onChange={onChangeLoading} />
        </FormField>
        <SecondaryButton onClick={resetTimeout}>Simulate Loading</SecondaryButton>
      </div>
      <Card>
        <Card.Body>
          <div className={contentStyles}>
            {loading ? (
              <div {...overlayStencil({loading})}>
                <Skeleton>
                  <div className={skeletonRowStyles}>
                    <Skeleton.Shape cs={skeletonShapeStyles} />
                    <div className={skeletonHeaderContainerStyles}>
                      <Skeleton.Header />
                    </div>
                  </div>
                  <Skeleton.Text lineCount={3} />
                </Skeleton>
              </div>
            ) : (
              <div>
                <div className={headingRowStyles}>
                  <SystemIconCircle icon={patternIcon} />
                  <Heading as="h3" size="small" cs={headingStyles}>
                    Patterns
                  </Heading>
                </div>
                <p>
                  Canvas Patterns classify and document reusable solutions built to respond to
                  common user scenarios. Following these guidelines allows us to design experiences
                  that feel consistent and natural for users as they move between applications and
                  ensures that our approach aligns with industry standards.
                </p>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
