import { useEffect, useState } from 'react';
import { ValidationResult } from '../types';
import { useDisclosure } from '@chakra-ui/react';
import { validateGuess } from '../utils';

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
  const [inputValues, setInputValues] = useState(Array(6).fill(''));
  const [currentRow, setCurrentRow] = useState(0);
  const [wordList, setWordList] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [validationResults, setValidationResults] = useState<ValidationResult[][]>([]);
  const [isWinner, setIsWinner] = useState<boolean | null>(null);
  const [keyboardRef, setKeyboardRef] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  }, []);

  useEffect(() => {
    setAvailableWords(wordList.filter(word => word.length === targetWord.length));
  }, [wordList, targetWord.length]);

  useEffect(() => {
    if (isWinner !== null) {
      onOpen();
    }
  }, [isWinner, onOpen]);

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

  const setRandomWord = (wordArray: string[]) => {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    setTargetWord(wordArray[randomIndex]);
  };

  const resetGameAndCloseModal = () => {
    setInputValues(Array(6).fill(''));
    setSelectedWord('');
    removeButtonColors(keyboardRef, validationResults);
    setValidationResults([]);
    setRandomWord(wordList);
    setAvailableWords(wordList.filter(word => word.length === targetWord.length));
    setCurrentRow(0);
    setIsWinner(null);
    onClose();
  };

  const handleGuessSubmit = (guess: string) => {
    const results = validateGuess(guess, targetWord);
    setValidationResults(prevResults => [...prevResults, results]);

    if (guess === targetWord) {
      setIsWinner(true);
    } else if (currentRow === 5 && isWinner === null) {
      setIsWinner(false);
    }

    if (guess !== targetWord) {
      setAvailableWords(prevWords => prevWords.filter(word => word !== guess));
    }
  };

  const handleInputChange = (value: string) => {
    const newValues = [...inputValues];
    newValues[currentRow] = value.toLowerCase();
    setInputValues(newValues);
  };

  const handleKeyPress = (key: string) => {
    const currentInput = inputValues[currentRow];
    if (key === 'Enter' && currentInput.length === targetWord.length) {
      handleGuessSubmit(currentInput);
      setCurrentRow(prevRow => prevRow < 5 ? prevRow + 1 : prevRow);
    } else if (key === 'Backspace' && currentInput.length > 0) {
      handleInputChange(currentInput.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(key) && currentInput.length < targetWord.length) {
      handleInputChange(`${currentInput}${key}`);
    }
  };

  return {
    inputValues,
    setInputValues,
    currentRow,
    setCurrentRow,
    setSelectedWord,
    wordList,
    availableWords,
    targetWord,
    selectedWord,
    isLoading,
    validationResults,
    isWinner,
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

