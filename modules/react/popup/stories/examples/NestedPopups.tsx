import {SecondaryButton} from '@workday/canvas-kit-react/button';
import {
  Popup,
  useCloseOnEscape,
  useCloseOnOutsideClick,
  useInitialFocus,
  usePopupCloseButton,
  usePopupModel,
  useReturnFocus,
} from '@workday/canvas-kit-react/popup';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const nestedPopupContainerStyles = createStyles({
  display: 'flex',
  gap: system.gap.md,
  padding: system.padding.xs,
});

const bodyTextStyles = createStyles({
  marginBlockStart: '0',
  marginBlockEnd: '0',
});

export const NestedPopups = () => {
  const popup1 = usePopupModel();
  const popup2 = usePopupModel();

  useCloseOnOutsideClick(popup1);
  useCloseOnEscape(popup1);
  useInitialFocus(popup1);
  useReturnFocus(popup1);

  useCloseOnOutsideClick(popup2);
  useCloseOnEscape(popup2);
  useInitialFocus(popup2);
  useReturnFocus(popup2);

  const closeBothProps = usePopupCloseButton(popup1, usePopupCloseButton(popup2));

  return (
    <>
      <Popup model={popup1}>
        <Popup.Target>Open Popup 1</Popup.Target>
        <Popup.Popper>
          <Popup.Card aria-label="Popup 1">
            <Popup.CloseIcon aria-label="Close" size="small" />
            <Popup.Body>
              <p className={bodyTextStyles}>Contents of Popup 1</p>
            </Popup.Body>
            <div className={nestedPopupContainerStyles}>
              <Popup model={popup2}>
                <Popup.Target>Open Popup 2</Popup.Target>
                <Popup.Popper>
                  <Popup.Card aria-label="Popup 2">
                    <Popup.CloseIcon aria-label="Close" size="small" />
                    <Popup.Body>
                      <p className={bodyTextStyles}>Contents of Popup 2</p>
                    </Popup.Body>
                    <Popup.ButtonGroup>
                      <Popup.CloseButton as={Popup.CloseButton} model={popup1}>
                        Close Both (as)
                      </Popup.CloseButton>
                      <SecondaryButton {...closeBothProps}>Close Both (props)</SecondaryButton>
                    </Popup.ButtonGroup>
                  </Popup.Card>
                </Popup.Popper>
              </Popup>
            </div>
          </Popup.Card>
        </Popup.Popper>
      </Popup>
    </>
  );
};
