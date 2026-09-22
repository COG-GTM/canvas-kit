import {DeleteButton, SecondaryButton} from '@workday/canvas-kit-react/button';
import {CanvasProvider} from '@workday/canvas-kit-react/common';
import {Popup} from '@workday/canvas-kit-react/popup';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';

const cardStyles = createStyles({
  width: px2rem(400),
});

const bodyStyles = createStyles({
  marginBlock: '0',
});

export const RTL = () => {
  return (
    <CanvasProvider dir="rtl">
      <Popup.Card cs={cardStyles}>
        <Popup.CloseIcon aria-label="סגור" />
        <Popup.Heading>למחוק פריט</Popup.Heading>
        <Popup.Body>
          <p className={bodyStyles}>האם ברצונך למחוק פריט זה</p>
        </Popup.Body>
        <Popup.ButtonGroup>
          <SecondaryButton>לְבַטֵל</SecondaryButton>
          <DeleteButton>לִמְחוֹק</DeleteButton>
        </Popup.ButtonGroup>
      </Popup.Card>
    </CanvasProvider>
  );
};
