import {PrimaryButton} from '@workday/canvas-kit-react/button';
import {CanvasProvider} from '@workday/canvas-kit-react/common';
import {Modal, useModalModel} from '@workday/canvas-kit-react/modal';
import {createStyles} from '@workday/canvas-kit-styling';
import {externalLinkIcon} from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';

const bodyTextStyles = createStyles({
  marginBlock: system.space.zero,
});

export const NoTargetRTL = () => {
  const model = useModalModel();
  const handleAcknowledge = () => {
    console.log('License Acknowledged');
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
  };

  return (
    <CanvasProvider dir="rtl">
      <PrimaryButton onClick={() => model.events.show()}>פתח רישיון</PrimaryButton>
      <Modal model={model}>
        <Modal.Overlay>
          <Modal.Card>
            <Modal.CloseIcon aria-label="Close" />
            <Modal.Heading>MIT License</Modal.Heading>
            <Modal.Body>
              <p className={bodyTextStyles}>
                בזאת ניתנת רשות, ללא תשלום, לכל אדם לקבל עותק של תוכנה זו וקבצי התיעוד הנלווים
                ("התוכנה").
              </p>
            </Modal.Body>
            <Modal.ButtonGroup>
              <Modal.CloseButton onClick={handleCancel}>לְבַטֵל</Modal.CloseButton>
              <Modal.CloseButton
                as={PrimaryButton}
                onClick={handleAcknowledge}
                icon={externalLinkIcon}
                iconPosition="end"
                shouldMirrorIconInRTL
              >
                לְהוֹדוֹת
              </Modal.CloseButton>
            </Modal.ButtonGroup>
          </Modal.Card>
        </Modal.Overlay>
      </Modal>
    </CanvasProvider>
  );
};
