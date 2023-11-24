import { useState } from 'react';
import { Box, Divider, Heading } from '@chakra-ui/react';
import { WordBoard } from './components/wordBoard';
import { Keyboard } from './components/keyboard';
import { useKeyboardInput } from './hooks';

const App = () => {
  const [inputValues, setInputValues] = useState(Array(6).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const wordLength = 5;
  console.log({ inputValues });

  const handleInputChange = (value: string) => {
    const newValues = [...inputValues];
    newValues[currentRow] = value;
    setInputValues(newValues);
  };

  const handleKeyPress = (key: string) => {
    if (key === 'Enter' && inputValues[currentRow].length === wordLength) {
      setCurrentRow((prevRow) => (prevRow < 5 ? prevRow + 1 : prevRow));
    } else if (key === 'Backspace') {
      handleInputChange(inputValues[currentRow].slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(key) && inputValues[currentRow].length < wordLength) {
      handleInputChange(inputValues[currentRow] + key);
    }
  };

  useKeyboardInput({ handleKeyPress });

  return (
    <Box>
      <Heading display="flex" justifyContent="center" my={4}>
        Sandbardle
      </Heading>
      <Divider orientation='horizontal' />
      <WordBoard
        length={wordLength}
        inputValues={inputValues}
        handleInputChange={handleInputChange}
        setCurrentRow={setCurrentRow}
      />
      <Keyboard
        length={wordLength}
        inputValues={inputValues}
        currentRow={currentRow}
        handleInputChange={handleInputChange}
        setCurrentRow={setCurrentRow}
      />
    </Box>
  );
}

export default App;
