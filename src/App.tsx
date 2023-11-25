import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Heading,
  Spinner,
  AbsoluteCenter,
  Center,
} from '@chakra-ui/react';
import { WordBoard } from './components/wordBoard';
import { Keyboard } from './components/keyboard';
import { useKeyboardInput } from './hooks';
import { ValidationResult } from './types';
import { validateGuess } from './utils';

const App = () => {
  const [inputValues, setInputValues] = useState(Array(6).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const [wordList, setWordList] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [validationResults, setValidationResults] = useState<ValidationResult[][]>([]);

  useEffect(() => {
    const getWords = async () => {
      try {
        const res = await fetch('/wordlist.txt');
        const words = await res.text();
        const wordArray = words.split('\n');
        setWordList(wordArray);
        setRandomWord(wordArray);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getWords();
  }, []);

  const setRandomWord = (lib: string[]) => {
    const randomIndex = Math.floor(Math.random() * lib.length);
    setTargetWord(lib[randomIndex]);
  }

  const resetGame = () => {
    setInputValues(Array(6).fill(""));
    setValidationResults([]);
    setRandomWord(wordList);
  }

  const handleGuessSubmit = (guess: string) => {
    const results = validateGuess(guess, targetWord);
    setValidationResults(prevResults => [...prevResults, results]);
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
      handleInputChange(currentInput + key);
    }
  };

  useKeyboardInput(handleKeyPress);

  if (isLoading) {
    return (
      <AbsoluteCenter>
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
        setCurrentRow={setCurrentRow}
        validationResults={validationResults}
      />
      <Keyboard
        length={targetWord.length}
        inputValues={inputValues}
        currentRow={currentRow}
        handleInputChange={handleInputChange}
        setCurrentRow={setCurrentRow}
        handleGuessSubmit={handleGuessSubmit}
        validationResults={validationResults}
      />
      <Center mt={8}>
        <Button onClick={resetGame}>Reset Game</Button>
      </Center>
    </Box>
  );
}

export default App;
