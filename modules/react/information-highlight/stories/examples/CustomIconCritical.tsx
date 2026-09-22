import {InformationHighlight} from '@workday/canvas-kit-react/information-highlight';
import {createStyles} from '@workday/canvas-kit-styling';
import {barChartIcon} from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  display: 'flex',
  flexDirection: 'column',
  gap: system.gap.sm,
});

export const IconCritical = () => {
  return (
    <div className={containerStyles}>
      <InformationHighlight variant={'critical'} emphasis={'low'}>
        <InformationHighlight.Icon icon={barChartIcon} />
        <InformationHighlight.Heading> Attention! Custom Highlight </InformationHighlight.Heading>
        <InformationHighlight.Body>
          A custom Icon can be added to the Information Highlight component
        </InformationHighlight.Body>
        <InformationHighlight.Link href="#hyperlink">View the Docs</InformationHighlight.Link>
      </InformationHighlight>
      <InformationHighlight variant={'critical'} emphasis={'high'}>
        <InformationHighlight.Icon icon={barChartIcon} />
        <InformationHighlight.Heading> Attention! Custom Highlight </InformationHighlight.Heading>
        <InformationHighlight.Body>
          A custom Icon can be added to the Information Highlight component
        </InformationHighlight.Body>
        <InformationHighlight.Link href="#hyperlink">View the Docs</InformationHighlight.Link>
      </InformationHighlight>
    </div>
  );
};
