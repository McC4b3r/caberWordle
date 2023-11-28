import { useEffect, useState, useCallback } from 'react';
import { ValidationResult } from '../types';
import { useDisclosure } from '@chakra-ui/react';
import { validateGuess } from '../utils';
import { MAX_ROWS } from '../constants';

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

export const useGameLogic = () => {
  const [gameState, setGameState] = useState({
    inputValues: Array(MAX_ROWS).fill(''),
    validationResults: [],
    currentRow: 0,
    targetWord: '',
    selectedWord: '',
    isWinner: null,
  });
  // const [validationResults, setValidationResults] = useState<ValidationResult[][]>([]);
  const [wordList, setWordList] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keyboardRef, setKeyboardRef] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateGameState = (updates: any) => {
    setGameState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const setRandomWord = useCallback((wordArray: string[]) => {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    updateGameState({ targetWord: wordArray[randomIndex] });
  }, []);

  useEffect(() => {
    const getWords = async () => {
      const res = await fetch('/wordlist.txt');
      const words = await res.text();
      const wordArray = words.split('\n');
      setWordList(wordArray);
      setRandomWord(wordArray);
      setIsLoading(false);
    };

    getWords().catch(console.error);
  }, [setRandomWord]);

  useEffect(() => {
    const { targetWord } = gameState;
    setAvailableWords(wordList.filter(word => word.length === targetWord.length));
  }, [wordList, gameState]);

  useEffect(() => {
    const { isWinner } = gameState;
    if (isWinner !== null) {
      onOpen();
    }
  }, [gameState, onOpen]);

  const updateKeyboardRef = (keyboard: any) => {
    setKeyboardRef(keyboard);
  };

  const generateButtonColors = (
    keyboard: any,
    validationResults: ValidationResult[][]
  ) => {
    validationResults.forEach((rowResults, rowIndex) => {
      rowResults.forEach((result, index) => {
        const className =
          result.status === "correct"
            ? "green-key"
            : result.status === "present"
              ? "yellow-key"
              : "grey-key";
        keyboard.addButtonTheme(result.letter.toUpperCase(), className);
      });
    });
  };

  const removeButtonColors = (
    keyboardRef: any,
    validationResults: ValidationResult[][]
  ) => {
    validationResults.forEach((rowResults) => {
      rowResults.forEach((result) => {
        const classNameToRemove =
          result.status === "correct"
            ? "green-key"
            : result.status === "present"
              ? "yellow-key"
              : "grey-key";
        keyboardRef.removeButtonTheme(result.letter.toUpperCase(), classNameToRemove);
      });
    });
  };

  const resetGameAndCloseModal = async () => {
    await updateGameState({
      inputValues: Array(MAX_ROWS).fill(''),
      selectedWord: '',
      currentRow: 0,
      isWinner: null,
    });
    await removeButtonColors(keyboardRef, gameState.validationResults);
    await updateGameState({ validationResults: [] })
    await setRandomWord(wordList);
    const { targetWord } = gameState;
    await setAvailableWords(wordList.filter(word => word.length === targetWord.length));
    onClose();
  };

  const handleGuessSubmit = (guess: string) => {
    const { targetWord, currentRow, isWinner } = gameState;
    const results = validateGuess(guess, targetWord);
    updateGameState(results);

    if (guess === targetWord) {
      updateGameState({ isWinner: true });
    } else if (currentRow === 5 && isWinner === null) {
      updateGameState({ isWinner: false });
    }

    if (guess !== targetWord) {
      setAvailableWords(prevWords => prevWords.filter(word => word !== guess));
    }
  };

  const handleInputChange = (value: string) => {
    const { inputValues, currentRow } = gameState;
    const newValues = [...inputValues];
    newValues[currentRow] = value.toLowerCase();
    updateGameState({ inputValues: newValues });
  };

  const handleKeyPress = (key: string) => {
    const { inputValues, currentRow, targetWord } = gameState
    const currentInput = inputValues[currentRow];
    if (key === 'Enter' && currentInput.length === targetWord.length) {
      handleGuessSubmit(currentInput);
      updateGameState({ currentRow: currentRow < 5 ? currentRow + 1 : currentRow })
    } else if (key === 'Backspace' && currentInput.length > 0) {
      handleInputChange(currentInput.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(key) && currentInput.length < targetWord.length) {
      handleInputChange(`${currentInput}${key}`);
    }
  };

  return {
    gameState,
    updateGameState,
    wordList,
    availableWords,
    isLoading,
    keyboardRef,
    updateKeyboardRef,
    generateButtonColors,
    removeButtonColors,
    setRandomWord,
    resetGameAndCloseModal,
    handleGuessSubmit,
    handleInputChange,
    handleKeyPress,
    isOpen,
  };
};

export default useGameLogic;

