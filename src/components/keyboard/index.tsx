import { useEffect, useRef } from "react";
import KeyboardReact from "react-simple-keyboard";
import { defaultLayout } from "./layout";
import "react-simple-keyboard/build/css/index.css";
import { Box, useToast } from "@chakra-ui/react";
import { KeyboardProps } from "../../types";
import './keycolors.css';

export const Keyboard = ({
  updateKeyboardRef,
  targetWordLength,
  setCurrentRow,
  handleInputChange,
  inputValues,
  currentRow,
  handleGuessSubmit,
  updateButtonColors,
  validationResults,
  isHardMode,
  containsAllValidLetters,
}: KeyboardProps) => {
  const keyboard = useRef<any>();
  const toast = useToast();

  useEffect(() => {
    updateButtonColors(keyboard.current, validationResults, true);
    keyboard.current.setInput(inputValues[currentRow]);
  }, [keyboard, updateButtonColors, inputValues, currentRow, validationResults]);

  // handles all virtual key press scenarios
  const onKeyPress = (button: string) => {
    const currentInput = inputValues[currentRow];
    if (button !== "{enter}" || currentInput.length !== targetWordLength) {
      return;
    }

    if (!isHardMode || containsAllValidLetters(currentInput)) {
      handleGuessSubmit(currentInput);
      setCurrentRow(prevRow => prevRow < 5 ? prevRow + 1 : prevRow);
    } else if (isHardMode && !containsAllValidLetters(currentInput)) {
      toast({
        title: 'Invalid Submission',
        description: 'Your submission does not contain previously confirmed letters.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      data-testid="virtual-keyboard"
      mt={10}
      maxW="container.sm"
      mx="auto"
    >
      <KeyboardReact
        keyboardRef={r => {
          updateKeyboardRef(r);
          return (keyboard.current = r)
        }
        }
        layout={defaultLayout}
        onChange={handleInputChange}
        onKeyPress={onKeyPress}
        maxLength={targetWordLength}
      />
    </Box>
  );
};
