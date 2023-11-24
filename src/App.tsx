import { useState } from 'react';
import { Box, Divider, Heading } from '@chakra-ui/react';
import { WordBoard } from './components/wordBoard';
import { Keyboard } from './components/keyboard';

const App = () => {
  const [inputValues, setInputValues] = useState(Array(6).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const wordLength = 5;
  // console.log({ inputValues });

  const handleInputChange = (value: string) => {
    const newValues = [...inputValues];
    newValues[currentRow] = value;
    setInputValues(newValues);

  };
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
        handleInputChange={handleInputChange}
        setCurrentRow={setCurrentRow}
      />
    </Box>
  );
}

export default App;
