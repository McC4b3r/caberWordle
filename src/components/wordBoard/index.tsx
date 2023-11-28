import { VStack } from '@chakra-ui/react';
import { Row } from '../row';
import { BoardProps } from '../../types';

export const WordBoard = ({
  targetWordlength,
  inputValues,
  handleInputChange,
  validationResults,
  currentRow,
}: BoardProps) => {

  const rows = Array.from({ length: 6 }, (_, index) => {
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
    <VStack spacing={2} mt={8} data-testid="word-board">
      {rows}
    </VStack>
  );
}
