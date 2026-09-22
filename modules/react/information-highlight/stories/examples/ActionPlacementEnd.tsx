import * as React from 'react';

import {InformationHighlight} from '@workday/canvas-kit-react/information-highlight';
import {SegmentedControl} from '@workday/canvas-kit-react/segmented-control';
import {Text} from '@workday/canvas-kit-react/text';
import {createStencil, createStyles, cssVar} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const containerStencil = createStencil({
  vars: {
    width: '',
  },
  base: ({width}) => ({
    width: cssVar(width, '100%'),
    marginBlockEnd: system.gap.lg,
  }),
});

const highlightGroupStyles = createStyles({
  display: 'flex',
  flexDirection: 'column',
  gap: system.gap.sm,
});

const bodyTextStyles = createStyles({
  margin: 0,
});

const segmentedControlListStyles = createStyles({
  marginBlockEnd: system.gap.lg,
});

export const ActionPlacementEnd = () => {
  const [containerWidth, setContainerWidth] = React.useState('100%');

  return (
    <div>
      <div {...containerStencil({width: containerWidth})}>
        <div className={highlightGroupStyles}>
          <InformationHighlight variant="informational" actionPlacement="end">
            <InformationHighlight.Icon />
            <InformationHighlight.Heading>Informational Highlight</InformationHighlight.Heading>
            <InformationHighlight.Body>
              <Text cs={bodyTextStyles}>
                With `actionPlacement="end"`, the link renders beside the content, vertically
                centered at the inline end. DOM and keyboard tab order stay heading, body, then
                link.
              </Text>
            </InformationHighlight.Body>
            <InformationHighlight.Link href="#hyperlink">Learn More</InformationHighlight.Link>
          </InformationHighlight>
          <InformationHighlight variant="caution" emphasis="high" actionPlacement="end">
            <InformationHighlight.Icon />
            <InformationHighlight.Heading>Caution Highlight</InformationHighlight.Heading>
            <InformationHighlight.Body>
              <Text cs={bodyTextStyles}>
                Action placement works across variants and emphasis levels.
              </Text>
            </InformationHighlight.Body>
            <InformationHighlight.Link href="#hyperlink">Learn More</InformationHighlight.Link>
          </InformationHighlight>
          <InformationHighlight variant="informational" actionPlacement="end">
            <InformationHighlight.Icon />
            <InformationHighlight.Heading>Long link label</InformationHighlight.Heading>
            <InformationHighlight.Body>
              <Text cs={bodyTextStyles}>
                In narrow layouts or with longer link labels, the link appears below the body,
                aligned to the inline end.
              </Text>
            </InformationHighlight.Body>
            <InformationHighlight.Link href="#hyperlink">
              View supplementary documentation and configuration information
            </InformationHighlight.Link>
          </InformationHighlight>
        </div>
      </div>
      <h4>Change Information Highlight container size</h4>
      <SegmentedControl initialValue="100%" onSelect={data => setContainerWidth(data.id)}>
        <SegmentedControl.List aria-label="container width control" cs={segmentedControlListStyles}>
          <SegmentedControl.Item data-id="100%">100%</SegmentedControl.Item>
          <SegmentedControl.Item data-id="480px">480px</SegmentedControl.Item>
          <SegmentedControl.Item data-id="320px">320px</SegmentedControl.Item>
          <SegmentedControl.Item data-id="250px">250px</SegmentedControl.Item>
        </SegmentedControl.List>
      </SegmentedControl>
      <p>Selected: {containerWidth}</p>
    </div>
  );
};
