import { VStack } from '@chakra-ui/react';
import { Row } from '../row';
import { BoardProps } from '../../types';
import { MAX_ROWS } from '../../constants';

export const WordBoard = ({
  gameState,
  handleInputChange,
}: BoardProps) => {
  const rows = Array.from({ length: MAX_ROWS }, (_, index) => {
    return (
      <Row
        gameState={gameState}
        key={index}
        rowIndex={index}
        handleInputChange={handleInputChange}
      />
    )
  });

  return (
    <VStack spacing={2} mt={8} data-testid="word-board">
      {rows}
    </VStack>
  );
}
