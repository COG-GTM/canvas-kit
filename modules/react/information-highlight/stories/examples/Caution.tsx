import {InformationHighlight} from '@workday/canvas-kit-react/information-highlight';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  display: 'flex',
  flexDirection: 'column',
  gap: system.gap.sm,
});

export const Caution = () => {
  return (
    <div className={containerStyles}>
      <InformationHighlight variant={'caution'}>
        <InformationHighlight.Icon />
        <InformationHighlight.Heading> Caution: Highlight Something </InformationHighlight.Heading>
        <InformationHighlight.Body>
          If you select the link below, nothing will happen
        </InformationHighlight.Body>
        <InformationHighlight.Link href="#hyperlink">View the Docs</InformationHighlight.Link>
      </InformationHighlight>
      <InformationHighlight variant={'caution'} emphasis={'high'}>
        <InformationHighlight.Icon />
        <InformationHighlight.Heading> Caution: Highlight Something </InformationHighlight.Heading>
        <InformationHighlight.Body>
          If you select the link below, nothing will happen
        </InformationHighlight.Body>
        <InformationHighlight.Link href="#hyperlink">View the Docs</InformationHighlight.Link>
      </InformationHighlight>
    </div>
  );
};
