import { VStack } from '@chakra-ui/react';
import { Row } from '../row';
import { BoardProps } from '../../types';

export const WordBoard = ({
  length,
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
        currentRow={currentRow}
        length={length}
        handleInputChange={handleInputChange}
        validationResults={validationResults}
      />
    )
  }
  );

  return (
    <VStack spacing={2} mt={8}>
      {rows}
    </VStack>
  );
}
