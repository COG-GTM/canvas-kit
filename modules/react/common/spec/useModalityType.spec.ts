import {act, renderHook} from '@testing-library/react';

import {useModalityType} from '../lib/utils/useModalityType';

const firePointerDown = (pointerType: string) => {
  const event = new Event('pointerdown');
  Object.defineProperty(event, 'pointerType', {value: pointerType});
  act(() => {
    document.dispatchEvent(event);
  });
};

describe('useModalityType', () => {
  it('should update to the pointerType of the last pointerdown event', () => {
    const {result} = renderHook(() => useModalityType());

    firePointerDown('touch');
    expect(result.current).toEqual('touch');

    firePointerDown('pen');
    expect(result.current).toEqual('pen');
  });

  it('should initialize newly mounted hooks with the last used modality', () => {
    const first = renderHook(() => useModalityType());
    firePointerDown('touch');
    first.unmount();

    const {result} = renderHook(() => useModalityType());
    expect(result.current).toEqual('touch');
  });

  it('should not access localStorage', () => {
    const getItem = vi.spyOn(Storage.prototype, 'getItem');
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    renderHook(() => useModalityType());

    firePointerDown('mouse');
    firePointerDown('touch');

    expect(getItem).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
    getItem.mockRestore();
    setItem.mockRestore();
  });
});
