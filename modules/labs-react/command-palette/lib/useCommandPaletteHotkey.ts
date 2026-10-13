import React from 'react';

import {usePopupModel} from '@workday/canvas-kit-react/popup';

export interface UseCommandPaletteHotkeyOptions {
  /**
   * The key that opens the palette when pressed together with <kbd>⌘</kbd> (macOS) or
   * <kbd>Ctrl</kbd> (Windows/Linux). Comparison is case-insensitive.
   * @default 'k'
   */
  key?: string;
  /**
   * If true, the global shortcut listener is not registered.
   * @default false
   */
  disabled?: boolean;
}

type PopupModel = ReturnType<typeof usePopupModel>;

interface HotkeyRegistration {
  key: string;
  modelRef: React.MutableRefObject<PopupModel>;
}

// A single document listener shared by every palette, so one key press only toggles one palette.
const registrations: HotkeyRegistration[] = [];

const onDocumentKeyDown = (event: KeyboardEvent) => {
  if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) {
    return;
  }
  const matching = registrations.filter(r => r.key === event.key.toLowerCase());
  if (!matching.length) {
    return;
  }
  event.preventDefault();
  const open = registrations.find(r => r.modelRef.current.state.visibility !== 'hidden');
  if (open) {
    // Close whichever palette is open instead of stacking a second one on top of it
    if (matching.includes(open)) {
      open.modelRef.current.events.hide(event);
    }
    return;
  }
  // The most recently mounted palette wins
  matching[matching.length - 1].modelRef.current.events.show(event);
};

/**
 * Registers a global <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> shortcut that toggles a
 * `CommandPalette`. Pass the model created with `useModalModel` (the same model passed to
 * `CommandPalette`).
 *
 * ```tsx
 * const model = useModalModel();
 * useCommandPaletteHotkey(model);
 *
 * <CommandPalette model={model} items={items} />
 * ```
 */
export const useCommandPaletteHotkey = (
  model: PopupModel,
  {key = 'k', disabled = false}: UseCommandPaletteHotkeyOptions = {}
) => {
  const modelRef = React.useRef(model);
  modelRef.current = model;

  React.useEffect(() => {
    if (disabled) {
      return;
    }
    const registration: HotkeyRegistration = {key: key.toLowerCase(), modelRef};
    if (!registrations.length) {
      document.addEventListener('keydown', onDocumentKeyDown);
    }
    registrations.push(registration);
    return () => {
      registrations.splice(registrations.indexOf(registration), 1);
      if (!registrations.length) {
        document.removeEventListener('keydown', onDocumentKeyDown);
      }
    };
  }, [disabled, key]);
};
