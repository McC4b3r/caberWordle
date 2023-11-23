import { useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { Row } from '../row';

type WordBoardProps = {
  length: number;
}

export const WordBoard = ({ length }: WordBoardProps) => {
  const [inputValues, setInputValues] = useState(Array(6).fill(""));
  // console.log({ inputValues });

  const handleInputChange = (value: string, rowIndex: number) => {
    const newValues = [...inputValues];
    newValues[rowIndex] = value;
    setInputValues(newValues);
  };

  const rows = Array.from({ length: 6 }, (_, index) =>
    <Row
      key={index}
      inputValues={inputValues}
      rowIndex={index}
      length={length}
      handleInputChange={handleInputChange}
    />
  );

  return (
    <VStack spacing={2} mt={8}>
      {rows}
    </VStack>
  );
}
