import {CanvasProvider} from '@workday/canvas-kit-react/common';
import {InformationHighlight} from '@workday/canvas-kit-react/information-highlight';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  display: 'flex',
  flexDirection: 'column',
  gap: system.gap.sm,
});

export const RTL = () => {
  return (
    <div className={containerStyles}>
      <CanvasProvider dir="rtl">
        <InformationHighlight variant={'caution'} emphasis={'low'}>
          <InformationHighlight.Icon />
          <InformationHighlight.Heading>
            {' '}
            انتباه! من اليمين إلى اليسار{' '}
          </InformationHighlight.Heading>
          <InformationHighlight.Body>
            نحن ندعم اللغات من اليمين إلى اليسار
          </InformationHighlight.Body>
          <InformationHighlight.Link href="#hyperlink">وثائق</InformationHighlight.Link>
        </InformationHighlight>
      </CanvasProvider>
      <CanvasProvider dir="rtl">
        <InformationHighlight variant={'caution'} emphasis={'high'}>
          <InformationHighlight.Icon />
          <InformationHighlight.Heading>
            {' '}
            انتباه! من اليمين إلى اليسار{' '}
          </InformationHighlight.Heading>
          <InformationHighlight.Body>
            نحن ندعم اللغات من اليمين إلى اليسار
          </InformationHighlight.Body>
          <InformationHighlight.Link href="#hyperlink">وثائق</InformationHighlight.Link>
        </InformationHighlight>
      </CanvasProvider>
      <CanvasProvider dir="rtl">
        <InformationHighlight variant="informational" actionPlacement="end">
          <InformationHighlight.Icon />
          <InformationHighlight.Heading>انتباه! من اليمين إلى اليسار</InformationHighlight.Heading>
          <InformationHighlight.Body>
            مع `actionPlacement="end"`، يظهر الرابط بجانب المحتوى، متمركزًا عموديًا عند نهاية السطر.
          </InformationHighlight.Body>
          <InformationHighlight.Link href="#hyperlink">وثائق</InformationHighlight.Link>
        </InformationHighlight>
      </CanvasProvider>
      <CanvasProvider dir="rtl">
        <InformationHighlight variant="caution" emphasis="high" actionPlacement="end">
          <InformationHighlight.Icon />
          <InformationHighlight.Heading>انتباه! من اليمين إلى اليسار</InformationHighlight.Heading>
          <InformationHighlight.Body>
            يعمل وضع الإجراء عبر الأنماط ومستويات التأكيد.
          </InformationHighlight.Body>
          <InformationHighlight.Link href="#hyperlink">وثائق</InformationHighlight.Link>
        </InformationHighlight>
      </CanvasProvider>
    </div>
  );
};
