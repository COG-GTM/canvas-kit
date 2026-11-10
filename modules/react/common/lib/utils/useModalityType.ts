import React from 'react';

type Modality = 'mouse' | 'touch' | 'pen';

// Shared across all hook instances so a newly mounted component starts with the last used
// modality. It is in-memory only and resets on page load.
// The following initialization is very difficult to test via automation. Don't mess with it unless
// you plan to manually test.
//
// 1. Initialize modality using the clientWidth of the browser
//   a. if < 768, default to 'touch'
//   b. else default to 'mouse'
let lastModality = ((typeof document !== 'undefined'
  ? document.documentElement.clientWidth < 768
    ? 'touch'
    : ''
  : '') || 'mouse') as Modality;

/**
 * Uses heuristics to determine if the user is on a touch device, uses a pen, or a mouse. This hook
 * is useful if you have styles or behaviors that depend on the user's interaction type. For
 * example, touch users can scroll horizontally easier than mouse users, so horizontal overflow
 * might be more desired than overflow menus on touch devices. For devices that support multiple
 * input types, the last used input type is saved. For these devices, consider the possibility this
 * value could change after your component is rendered, so make sure you component rerenders
 * properly in this case.
 *
 * Uses `PointerEvent.pointerType` to determine last used input.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType
 */
export const useModalityType = (): Modality => {
  const [modality, setModality] = React.useState(lastModality);

  React.useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const value = event.pointerType as Modality;
      setModality(value);
      lastModality = value;
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return modality;
};
