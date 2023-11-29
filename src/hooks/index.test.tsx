import { renderHook } from '@testing-library/react'
import { useKeyboardInput } from '.';

describe('useKeyboardInput', () => {
  it('calls handleKeyPress on valid key press', () => {
    const mockHandleKeyPress = jest.fn();
    renderHook(() => useKeyboardInput(mockHandleKeyPress));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    expect(mockHandleKeyPress).toHaveBeenCalledWith('a');
  });

  it('does not call handleKeyPress on invalid key press', () => {
    const mockHandleKeyPress = jest.fn();
    renderHook(() => useKeyboardInput(mockHandleKeyPress));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: '?' }));
    expect(mockHandleKeyPress).not.toHaveBeenCalled();
  });

  it('cleans up the event listener on unmount', () => {
    const mockHandleKeyPress = jest.fn();
    const { unmount } = renderHook(() => useKeyboardInput(mockHandleKeyPress));

    unmount();

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    expect(mockHandleKeyPress).not.toHaveBeenCalled();
  });
});

