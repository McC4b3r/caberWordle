import { Container, VStack } from '@chakra-ui/react';
import { Row } from '../row';
import { BoardProps } from '../../types';
import { GUESS_ATTEMPTS } from '../../constants';

export const WordBoard = ({
  inputValues,
  targetWordlength,
  handleInputChange,
  validationResults,
}: BoardProps) => {

  const rows = Array.from({ length: GUESS_ATTEMPTS }, (_, index) => {
    return (
      <Row
        key={index}
        inputValues={inputValues}
        rowIndex={index}
        targetWordlength={targetWordlength}
        handleInputChange={handleInputChange}
        validationResults={validationResults}
      />
    )
  }
  );

  return (
    <Container>
      <VStack spacing={2} mt={4} data-testid="word-board">
        {rows}
      </VStack>
    </Container>
  );
}
