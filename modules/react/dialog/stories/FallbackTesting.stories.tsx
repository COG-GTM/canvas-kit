import {PrimaryButton} from '@workday/canvas-kit-react/button';
import {Dialog} from '@workday/canvas-kit-react/dialog';
import {calc, createStyles} from '@workday/canvas-kit-styling';
import {base, system} from '@workday/canvas-tokens-web';

const grid = createStyles({
  display: 'grid',
  gridTemplateAreas: "'topButton topButton''leftButton rightButton''bottomButton bottomButton'",
  height: calc.subtract('100vh', system.size.xxl),
  width: calc.subtract('100vw', base.size1000),
});

const topButton = createStyles({
  gridArea: 'topButton',
  justifySelf: 'center',
});
const rightButton = createStyles({
  gridArea: 'rightButton',
  justifySelf: 'right',
  alignSelf: 'center',
});
const bottomButton = createStyles({
  gridArea: 'bottomButton',
  justifySelf: 'center',
  alignSelf: 'end',
});
const leftButton = createStyles({
  gridArea: 'leftButton',
  justifySelf: 'left',
  alignSelf: 'center',
});

const dialogHeading = createStyles({
  paddingBlockStart: system.padding.md,
});

export default {
  title: 'Testing/Popups/Dialog',
  component: Dialog,
};

export const DialogWithFallbackPlacements = () => {
  return (
    <div data-testid="scroll-area-fallback-placement">
      <div className={grid}>
        <Dialog>
          <Dialog.Target cs={topButton} as={PrimaryButton}>
            Placement Top
          </Dialog.Target>
          <Dialog.Popper placement="top">
            <Dialog.Card>
              <Dialog.CloseIcon aria-label="Close" />
              <Dialog.Heading cs={dialogHeading}>This is dialog heading</Dialog.Heading>
              <Dialog.Body>This is dialog body.</Dialog.Body>
              <Dialog.ButtonGroup>
                <Dialog.CloseButton>Cancel</Dialog.CloseButton>
                <Dialog.CloseButton as={PrimaryButton}>Submit</Dialog.CloseButton>
              </Dialog.ButtonGroup>
            </Dialog.Card>
          </Dialog.Popper>
        </Dialog>
        <Dialog>
          <Dialog.Target cs={leftButton} as={PrimaryButton}>
            Placement Left
          </Dialog.Target>
          <Dialog.Popper placement="left">
            <Dialog.Card>
              <Dialog.CloseIcon aria-label="Close" />
              <Dialog.Heading cs={dialogHeading}>This is dialog heading</Dialog.Heading>
              <Dialog.Body>This is dialog body.</Dialog.Body>
              <Dialog.ButtonGroup>
                <Dialog.CloseButton>Cancel</Dialog.CloseButton>
                <Dialog.CloseButton as={PrimaryButton}>Submit</Dialog.CloseButton>
              </Dialog.ButtonGroup>
            </Dialog.Card>
          </Dialog.Popper>
        </Dialog>
        <Dialog>
          <Dialog.Target cs={rightButton} as={PrimaryButton}>
            Placement Right
          </Dialog.Target>
          <Dialog.Popper placement="right">
            <Dialog.Card>
              <Dialog.CloseIcon aria-label="Close" />
              <Dialog.Heading cs={dialogHeading}>This is dialog heading</Dialog.Heading>
              <Dialog.Body>This is dialog body.</Dialog.Body>
              <Dialog.ButtonGroup>
                <Dialog.CloseButton>Cancel</Dialog.CloseButton>
                <Dialog.CloseButton as={PrimaryButton}>Submit</Dialog.CloseButton>
              </Dialog.ButtonGroup>
            </Dialog.Card>
          </Dialog.Popper>
        </Dialog>
        <Dialog>
          <Dialog.Target cs={bottomButton} as={PrimaryButton}>
            Placement Bottom
          </Dialog.Target>
          <Dialog.Popper placement="bottom">
            <Dialog.Card>
              <Dialog.CloseIcon aria-label="Close" />
              <Dialog.Heading cs={dialogHeading}>This is dialog heading</Dialog.Heading>
              <Dialog.Body>This is dialog body.</Dialog.Body>
              <Dialog.ButtonGroup>
                <Dialog.CloseButton>Cancel</Dialog.CloseButton>
                <Dialog.CloseButton as={PrimaryButton}>Submit</Dialog.CloseButton>
              </Dialog.ButtonGroup>
            </Dialog.Card>
          </Dialog.Popper>
        </Dialog>
      </div>
    </div>
  );
};
