import { VStack } from '@chakra-ui/react';
import { Row } from '../row';
import { WordBoardProps } from '../../types';

export const WordBoard = ({
  length,
  inputValues,
  handleInputChange,
}: WordBoardProps) => {

  const rows = Array.from({ length: 6 }, (_, index) => {
    return (
      <Row
        key={index}
        inputValues={inputValues}
        rowIndex={index}
        length={length}
        handleInputChange={handleInputChange}
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
