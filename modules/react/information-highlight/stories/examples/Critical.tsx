import {InformationHighlight} from '@workday/canvas-kit-react/information-highlight';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  display: 'flex',
  flexDirection: 'column',
  gap: system.gap.sm,
});

export const Critical = () => {
  return (
    <div className={containerStyles}>
      <InformationHighlight variant={'critical'}>
        <InformationHighlight.Icon />
        <InformationHighlight.Heading>Attention! Highlight Something</InformationHighlight.Heading>
        <InformationHighlight.Body>
          If you select the link below it will reroute you back to this page.
        </InformationHighlight.Body>
        <InformationHighlight.Link href="#hyperlink">View the Docs</InformationHighlight.Link>
      </InformationHighlight>
      <InformationHighlight variant={'critical'} emphasis={'high'}>
        <InformationHighlight.Icon />
        <InformationHighlight.Heading>Attention! Highlight Something</InformationHighlight.Heading>
        <InformationHighlight.Body>
          If you select the link below it will reroute you back to this page.
        </InformationHighlight.Body>
        <InformationHighlight.Link href="#hyperlink">View the Docs</InformationHighlight.Link>
      </InformationHighlight>
    </div>
  );
};
