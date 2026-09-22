import React from 'react';

import {Hyperlink, TertiaryButton} from '@workday/canvas-kit-react/button';
import {useUniqueId} from '@workday/canvas-kit-react/common';
import {Dialog, useDialogModel} from '@workday/canvas-kit-react/dialog';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {
  useCloseOnEscape,
  useCloseOnOutsideClick,
  useFocusRedirect,
  useInitialFocus,
  useReturnFocus,
} from '@workday/canvas-kit-react/popup';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {Tooltip} from '@workday/canvas-kit-react/tooltip';
import {createStyles} from '@workday/canvas-kit-styling';
import {infoIcon} from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';

const formContainerStyles = createStyles({
  display: 'flex',
});

const containerStyles = createStyles({
  display: 'flex',
  flexDirection: 'row',
  gap: system.gap.sm,
});

const labelStyles = createStyles({
  minWidth: 'unset',
  width: '100%',
});

const headingStyles = createStyles({
  paddingBlockStart: system.padding.xxl,
});

const linkContainerStyles = createStyles({
  display: 'flex',
  gap: system.gap.md,
  padding: system.padding.xs,
  marginBlockStart: system.gap.sm,
});

export function ContextualHelpDialogFocusRedirect() {
  const dialogModel = useDialogModel();
  useCloseOnOutsideClick(dialogModel);
  useCloseOnEscape(dialogModel);
  useInitialFocus(dialogModel);
  useFocusRedirect(dialogModel);
  useReturnFocus(dialogModel);

  const labelId = useUniqueId();

  return (
    <div className={formContainerStyles}>
      <FormField>
        <div className={containerStyles}>
          <FormField.Label className={labelStyles} id={labelId}>
            Country
          </FormField.Label>
          <Dialog model={dialogModel}>
            <Tooltip title="More Info">
              <Dialog.Target
                as={TertiaryButton}
                size="small"
                icon={infoIcon}
                aria-describedby={labelId}
              />
            </Tooltip>
            <Dialog.Popper placement="right">
              <Dialog.Card>
                <Dialog.CloseIcon aria-label="Close" />
                <Dialog.Heading cs={headingStyles}>Information</Dialog.Heading>
                <Dialog.Body>
                  This dialog does not trap focus, so tabbing out of it will cause it to close
                </Dialog.Body>
                <div className={linkContainerStyles}>
                  <Hyperlink href="/">Link</Hyperlink>
                </div>
              </Dialog.Card>
            </Dialog.Popper>
          </Dialog>
        </div>
        <FormField.Field>
          <FormField.Input as={TextInput} />
        </FormField.Field>
      </FormField>
    </div>
  );
}
