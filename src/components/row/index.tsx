import { HStack, Input, PinInput, PinInputField } from '@chakra-ui/react';
import { RowProps } from '../../types';
import { getBackgroundColor } from '../../utils';

export const Row = ({
  gameState,
  rowIndex,
  handleInputChange,
}: RowProps) => {
  const { inputValues, targetWord, validationResults } = gameState;
  console.log({ validationResults })
  return (
    <HStack key={rowIndex} data-testid="row">
      <PinInput
        type='alphanumeric'
        placeholder=''
        size="lg"
        value={inputValues[rowIndex]}
        onChange={(value) => handleInputChange(value)}
      >
        {Array.from({ length: targetWord.length }, (_, index) => {
          const result = validationResults?.[rowIndex]?.[index];
          const backgroundColor = result ? getBackgroundColor(result) : 'transparent';

          return (
            <PinInputField
              as={Input}
              key={index}
              isReadOnly
              cursor="default"
              border="1px solid"
              borderColor="black"
              px="0"
              textTransform="uppercase"
              _hover={{ borderColor: 'black' }}
              _focusVisible={{ borderColor: 'black' }}
              aria-label="Please enter your letter"
              backgroundColor={backgroundColor}
            />
          );
        })}
      </PinInput>
    </HStack>
  )
};

