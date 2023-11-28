import { ChangeEvent } from 'react';
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
  gameState,
  updateGameState,
  wordList,
  availableWords,
  handleGuessSubmit,
  handleInputChange,
}: AnswerSpecifierProps) => {
  const { selectedWord, currentRow } = gameState;
  const wordNum = (word: string) => wordList.indexOf(word) + 1;
  const isDisabled = selectedWord.length === 0;

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateGameState({ selectedWord: e.target.value });
  };

  const handleSubmit = () => {
    const newCurrentRow = currentRow < 5 ? currentRow + 1 : currentRow;
    handleInputChange(selectedWord);
    handleGuessSubmit(selectedWord);
    updateGameState({
      selectedWord: '',
      currentRow: newCurrentRow,
    });
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
