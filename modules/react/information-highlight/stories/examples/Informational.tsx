import {InformationHighlight} from '@workday/canvas-kit-react/information-highlight';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  display: 'flex',
  flexDirection: 'column',
  gap: system.gap.sm,
});

const contentTextStyles = createStyles({
  margin: 0,
});

const contentListStyles = createStyles({
  listStyle: 'inside',
  marginInlineStart: 0,
  marginBlockStart: system.gap.sm,
  marginBlockEnd: 0,
  padding: 0,
});

export const Informational = () => {
  return (
    <div className={containerStyles}>
      <InformationHighlight variant={'informational'}>
        <InformationHighlight.Icon />
        <InformationHighlight.Heading> Informational Highlight </InformationHighlight.Heading>
        <InformationHighlight.Body>
          <p className={contentTextStyles}>
            This is a low-emphasis, informational callout. You should use this for nice-to-have
            information, such as:
          </p>
          <ul className={contentListStyles}>
            <li>tangential information or context</li>
            <li>related features</li>
            <li>additional opportunities</li>
          </ul>
        </InformationHighlight.Body>
        <InformationHighlight.Link href="#hyperlink">Learn More</InformationHighlight.Link>
      </InformationHighlight>
      <InformationHighlight variant={'informational'} emphasis={'high'}>
        <InformationHighlight.Icon />
        <InformationHighlight.Heading> Informational Highlight </InformationHighlight.Heading>
        <InformationHighlight.Body>
          <p className={contentTextStyles}>
            This is a high-emphasis, informational callout. You should use this for nice-to-have
            information, such as:
          </p>
          <ul className={contentListStyles}>
            <li>tangential information or context</li>
            <li>related features</li>
            <li>additional opportunities</li>
          </ul>
        </InformationHighlight.Body>
        <InformationHighlight.Link href="#hyperlink">Learn More</InformationHighlight.Link>
      </InformationHighlight>
    </div>
  );
};
