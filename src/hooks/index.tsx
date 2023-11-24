import { useEffect } from 'react';

export const useKeyboardInput = (handleKeyPress: (key: string) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (/^[a-zA-Z]$/.test(key) || key === 'Backspace' || key === 'Enter') {
        handleKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress]);
};
