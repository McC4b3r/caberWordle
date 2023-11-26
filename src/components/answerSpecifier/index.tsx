import { useState, ChangeEvent } from 'react';
import {
  Heading,
  VStack,
  Container,
  Select,
  Flex,
  Button,
} from '@chakra-ui/react';
import { AnswerSpecifierProps } from '../../types';

export const AnswerSpecifier = ({
  wordList,
  availableWords,
  setCurrentRow,
  handleGuessSubmit,
  handleInputChange,
}: AnswerSpecifierProps) => {
  const [selectedWord, setSelectedWord] = useState('');

  const wordNum = (word: string) => wordList.indexOf(word) + 1;
  const isDisabled = selectedWord.length === 0;

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedWord(e.target.value);
  };

  const handleSubmit = () => {
    handleInputChange(selectedWord);
    handleGuessSubmit(selectedWord);
    setSelectedWord('');
    setCurrentRow(prevRow => prevRow < 5 ? prevRow + 1 : prevRow);
  };

  return (
    <Container maxW='md' mt={8} mb={4}>
      <VStack>
        <Heading size='xs'>
          Answer Specifier
        </Heading>
        <Flex>
          <Select
            placeholder='Take a guess'
            value={selectedWord}
            onChange={handleSelectChange}
          >
            {availableWords.map((word, i) => (
              <option key={i} value={word}>{`${wordNum(word)}: ${word}`}</option>
            ))}
          </Select>
          <Button
            ml={2}
            isDisabled={isDisabled}
            onClick={handleSubmit}
          >
            Guess
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
};
