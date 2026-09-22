import React from 'react';

import {DeleteButton} from '@workday/canvas-kit-react/button';
import {useUniqueId} from '@workday/canvas-kit-react/common';
import {Modal, useModalModel} from '@workday/canvas-kit-react/modal';
import {Heading, Text} from '@workday/canvas-kit-react/text';
import {Tooltip} from '@workday/canvas-kit-react/tooltip';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';
import {trashIcon} from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';

const INITIAL_FILES = ['Resume.docx', 'Cover_Letter.docx', 'References.docx'];

const headingStyles = createStyles({
  marginBlock: system.space.zero,
});

const emptyStateStyles = createStyles({
  maxWidth: px2rem(448),
  outline: 'none',
});

const listStyles = createStyles({
  display: 'flex',
  flexDirection: 'column',
  gap: system.gap.md,
  marginBlock: system.space.zero,
  padding: system.space.zero,
  listStyle: 'none',
  maxWidth: px2rem(448),
});

const rowStyles = createStyles({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: system.gap.md,
  width: '100%',
});

function fileNameId(name: string) {
  return `return-focus-file-${name.replace(/[^a-zA-Z0-9]/g, '_')}`;
}

/** Index of a delete button to focus after removing `deletedIndex`, or empty list. */
function nextListFocusAfterDelete(deletedIndex: number, lengthBeforeDelete: number) {
  if (lengthBeforeDelete <= 1) {
    return 'empty' as const;
  }
  return deletedIndex < lengthBeforeDelete - 1 ? deletedIndex : deletedIndex - 1;
}

export const ReturnFocus = () => {
  const [items, setItems] = React.useState<string[]>(() => [...INITIAL_FILES]);
  const [confirmingFileName, setConfirmingFileName] = React.useState<string | null>(null);
  const bodyTextId = useUniqueId();

  const returnFocusRef = React.useRef<HTMLButtonElement | null>(null);
  const cancelButtonRef = React.useRef<HTMLButtonElement>(null);
  const deleteButtonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const emptyStateRef = React.useRef<HTMLDivElement>(null);
  const pendingDeleteIndexRef = React.useRef<number | null>(null);
  const postDeleteFocusRef = React.useRef<number | 'empty' | null>(null);

  const model = useModalModel({
    returnFocusRef,
    initialFocusRef: cancelButtonRef,
  });

  React.useEffect(() => {
    if (model.state.visibility === 'hidden') {
      setConfirmingFileName(null);
      pendingDeleteIndexRef.current = null;
    }
  }, [model.state.visibility]);

  React.useLayoutEffect(() => {
    if (postDeleteFocusRef.current === null) {
      return;
    }
    if (postDeleteFocusRef.current === 'empty') {
      emptyStateRef.current?.focus();
    } else {
      deleteButtonRefs.current[postDeleteFocusRef.current]?.focus();
    }
    postDeleteFocusRef.current = null;
  }, [items]);

  const openDeleteModal = (index: number) => {
    pendingDeleteIndexRef.current = index;
    setConfirmingFileName(items[index]);
    returnFocusRef.current = deleteButtonRefs.current[index];
    model.events.show();
  };

  const handleConfirmDelete = () => {
    const idx = pendingDeleteIndexRef.current;
    if (idx === null) {
      return;
    }
    postDeleteFocusRef.current = nextListFocusAfterDelete(idx, items.length);
    pendingDeleteIndexRef.current = null;
    setItems(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <Modal model={model}>
      <Heading as="h4" size="small" cs={headingStyles}>
        Uploaded Files
      </Heading>
      <div>
        {items.length > 0 ? (
          <ul className={listStyles}>
            {items.map((name, index) => (
              <li key={name} className={rowStyles}>
                <Text as="span" id={fileNameId(name)}>
                  {name}
                </Text>
                <Tooltip title="Delete">
                  <DeleteButton
                    aria-describedby={fileNameId(name)}
                    icon={trashIcon}
                    ref={el => {
                      deleteButtonRefs.current[index] = el;
                    }}
                    onClick={() => openDeleteModal(index)}
                  />
                </Tooltip>
              </li>
            ))}
          </ul>
        ) : (
          <div ref={emptyStateRef} tabIndex={-1} className={emptyStateStyles}>
            <Text>No files remaining.</Text>
          </div>
        )}
      </div>
      <Modal.Overlay>
        <Modal.Card aria-describedby={bodyTextId}>
          <Modal.Heading>Delete file?</Modal.Heading>
          <Modal.Body>
            <Text id={bodyTextId}>
              {confirmingFileName
                ? `Are you sure you want to delete ${confirmingFileName}?`
                : 'Are you sure you want to delete this file?'}
            </Text>
          </Modal.Body>
          <Modal.ButtonGroup>
            <Modal.CloseButton ref={cancelButtonRef}>Cancel</Modal.CloseButton>
            <Modal.CloseButton as={DeleteButton} onClick={handleConfirmDelete}>
              Delete
            </Modal.CloseButton>
          </Modal.ButtonGroup>
        </Modal.Card>
      </Modal.Overlay>
    </Modal>
  );
};
