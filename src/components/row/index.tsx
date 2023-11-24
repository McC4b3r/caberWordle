import { HStack, Input, PinInput, PinInputField } from '@chakra-ui/react';
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
          as={Input}
          isReadOnly
          cursor="default"
          border="1px solid"
          borderColor="black"
          _hover={{ borderColor: 'black' }}
          _focusVisible={{ borderColor: 'black' }}
          aria-label="Please enter your letter"
          key={index}
          sx={{ textTransform: 'uppercase' }}
        />
      ))}
    </PinInput>
  </HStack>
);