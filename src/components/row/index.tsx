import { HStack, PinInput, PinInputField } from '@chakra-ui/react';

type RowProps = {
  rowIndex: number;
  inputValues: string[];
  length: number;
  handleInputChange: (word: string) => void;
};

export const Row = ({
  inputValues,
  rowIndex,
  length,
  handleInputChange,

}: RowProps) => (
  <HStack key={rowIndex}>
    <PinInput
      type='alphanumeric'
      placeholder=''
      size="lg"
      value={inputValues[rowIndex]}
      onChange={(value) => handleInputChange(value)}
    >
      {Array.from({ length }, (_, index) => (
        <PinInputField
          key={index}
          sx={{ textTransform: 'uppercase' }}
        />
      ))}
    </PinInput>
  </HStack>
);