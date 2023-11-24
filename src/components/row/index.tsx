import { HStack, PinInput, PinInputField } from '@chakra-ui/react';
import { RowProps } from '../../types';

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