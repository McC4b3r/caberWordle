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

const App = () => {
  const [inputValues, setInputValues] = useState(Array(6).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const [wordList, setWordList] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // console.log({ inputValues });

  const setRandomWord = (lib: string[]) => {
    if (lib.length > 0) {
      const randomIndex = Math.floor(Math.random() * lib.length);
      setTargetWord(lib[randomIndex]);
    }
  }

  const resetGame = () => {
    setInputValues(Array(6).fill(""))
    setRandomWord(wordList);
  }

  useEffect(() => {
    const getWords = async () => {
      try {
        const res = await fetch('/wordlist.txt');
        const words = await res.text();
        const wordArray = words.split('\n');
        setWordList(wordArray);
        setRandomWord(wordArray);

      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    getWords();
  }, []);

  let length = targetWord.length;

  const handleInputChange = (value: string) => {
    const newValues = [...inputValues];
    newValues[currentRow] = value.toLowerCase();
    setInputValues(newValues);
  };

  const handleKeyPress = (key: string) => {
    const currentInput = inputValues[currentRow];
    const isEnter = key === 'Enter';
    const isBackspace = key === 'Backspace';
    const canAddChar = /^[a-zA-Z]$/.test(key) && currentInput.length < length;

    if (isEnter && currentInput.length === length) {
      setCurrentRow(prevRow => (prevRow < 5 ? prevRow + 1 : prevRow));
    } else if (isBackspace && currentInput.length > 0) {
      handleInputChange(currentInput.slice(0, -1));
    } else if (canAddChar) {
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
      <Heading display="flex" justifyContent="center" my={4}>
        Sandbardle
      </Heading>
      <Divider orientation='horizontal' />
      <WordBoard
        length={length}
        inputValues={inputValues}
        handleInputChange={handleInputChange}
        setCurrentRow={setCurrentRow}
      />
      <Keyboard
        length={length}
        inputValues={inputValues}
        currentRow={currentRow}
        handleInputChange={handleInputChange}
        setCurrentRow={setCurrentRow}
      />
      <Center mt={8}>
        <Button onClick={resetGame}>
          Reset Game
        </Button>
      </Center>
    </Box>
  );
}

export default App;
