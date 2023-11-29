import { ChangeEvent } from 'react';
import {
  Heading,
  VStack,
  Container,
  Select,
  Flex,
  Button,
  useToast,
} from '@chakra-ui/react';
import { AnswerSpecifierProps } from '../../types';

export const AnswerSpecifier = ({
  wordList,
  availableWords,
  selectedWord,
  setSelectedWord,
  setCurrentRow,
  handleInputChange,
  handleGuessSubmit,
  isHardMode,
  containsAllValidLetters,
}: AnswerSpecifierProps) => {
  const toast = useToast();

  // line number of word from wordlist.txt
  const wordNum = (word: string) => wordList.indexOf(word) + 1;
  const isDisabled = selectedWord.length === 0;

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedWord(e.target.value);
  };

  const handleSubmit = () => {
    if (!isHardMode || containsAllValidLetters(selectedWord)) {
      handleInputChange(selectedWord);
      handleGuessSubmit(selectedWord);
      setSelectedWord('');
      setCurrentRow(prevRow => prevRow < 5 ? prevRow + 1 : prevRow);
    } else if (isHardMode && !containsAllValidLetters(selectedWord)) {
      toast({
        title: 'Invalid Submission',
        description: 'Your submission does not contain previously confirmed letters.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW='md' mt={8} mb={4} data-testid="answer-specifier">
      <VStack>
        <Heading size='xs'>
          Answer Specifier
        </Heading>
        <Flex>
          <Select
            data-testid="select-possible-answers"
            placeholder='Take a guess'
            value={selectedWord}
            onChange={handleSelectChange}
          >
            {availableWords.map((word, i) => (
              <option
                aria-label={word}
                key={i}
                value={word}
              >{`${wordNum(word)}: ${word}`}
              </option>
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
