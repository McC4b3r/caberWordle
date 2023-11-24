import { Dispatch, SetStateAction } from 'react';
import { VStack } from '@chakra-ui/react';
import { Row } from '../row';

type WordBoardProps = {
  length: number;
  inputValues: string[];
  setInputValues: Dispatch<SetStateAction<string[]>>;
  handleInputChange: (value: string) => void;
  currentRow: number;
  setCurrentRow: Dispatch<SetStateAction<number>>;
}

export const WordBoard = ({
  length,
  inputValues,
  setInputValues,
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
