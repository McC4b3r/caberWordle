import { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Heading,
  Spinner,
  AbsoluteCenter,
  Center,
  useDisclosure,
} from '@chakra-ui/react';
import { WordBoard } from './components/wordBoard';
import { Keyboard } from './components/keyboard';
import { AnswerSpecifier } from './components/answerSpecifier';
import { FinishedModal } from './components/finishedModal';
import { useKeyboardInput } from './hooks';
import { ValidationResult } from './types';
import { validateGuess } from './utils';
import { ResetButton } from './components/resetButton';

const App = () => {
  const [inputValues, setInputValues] = useState(Array(6).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const [wordList, setWordList] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [validationResults, setValidationResults] = useState<ValidationResult[][]>([]);
  const [isWinner, setIsWinner] = useState<boolean | null>(null);
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

  const setRandomWord = (wordArray: string[]) => {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    setTargetWord(wordArray[randomIndex]);
  };

  const resetGameAndCloseModal = () => {
    setInputValues(Array(6).fill(''));
    setSelectedWord('');
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

  useKeyboardInput(handleKeyPress);

  if (isLoading) {
    return (
      <AbsoluteCenter data-testid="loading-spinner">
        <Spinner />
      </AbsoluteCenter>
    );
  }

  return (
    <Box>
      <Heading display="flex" justifyContent="center" my={4}>Sandbardle</Heading>
      <Divider orientation='horizontal' />
      <WordBoard
        length={targetWord.length}
        inputValues={inputValues}
        currentRow={currentRow}
        handleInputChange={handleInputChange}
        validationResults={validationResults}
      />
      <AnswerSpecifier
        wordList={wordList}
        availableWords={availableWords}
        selectedWord={selectedWord}
        setSelectedWord={setSelectedWord}
        setCurrentRow={setCurrentRow}
        handleInputChange={handleInputChange}
        handleGuessSubmit={handleGuessSubmit}
      />
      <Keyboard
        length={targetWord.length}
        inputValues={inputValues}
        currentRow={currentRow}
        handleInputChange={handleInputChange}
        setCurrentRow={setCurrentRow}
        handleGuessSubmit={handleGuessSubmit}
      />
      <Center mt={8}>
        <ResetButton resetGameAndCloseModal={resetGameAndCloseModal} />
      </Center>
      <FinishedModal
        isOpen={isOpen}
        isWinner={isWinner}
        targetWord={targetWord}
        resetGame={resetGameAndCloseModal}
      />
    </Box>
  );
};

export default App;
