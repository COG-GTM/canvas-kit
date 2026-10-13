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
  model: ReturnType<typeof usePopupModel>,
  {key = 'k', disabled = false}: UseCommandPaletteHotkeyOptions = {}
) => {
  const visible = model.state.visibility !== 'hidden';
  const {show, hide} = model.events;

  React.useEffect(() => {
    if (disabled) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.shiftKey &&
        event.key.toLowerCase() === key.toLowerCase()
      ) {
        event.preventDefault();
        if (visible) {
          hide(event);
        } else {
          show(event);
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [disabled, key, visible, show, hide]);
};
