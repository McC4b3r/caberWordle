import { useEffect, useRef } from "react";
import KeyboardReact from "react-simple-keyboard";
import { defaultLayout } from "./layout";
import "react-simple-keyboard/build/css/index.css";
import { Box } from "@chakra-ui/react";
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
}: KeyboardProps) => {
  const keyboard = useRef<any>();

  useEffect(() => {
    updateButtonColors(keyboard.current, validationResults, true);
    keyboard.current.setInput(inputValues[currentRow]);
  }, [keyboard, updateButtonColors, inputValues, currentRow, validationResults]);

  const onKeyPress = (button: string) => {
    if (button === "{enter}" && inputValues[currentRow].length === targetWordLength) {
      handleGuessSubmit(inputValues[currentRow]);
      setCurrentRow(prevRow => {
        keyboard.current.setInput("");
        return prevRow < 5 ? prevRow + 1 : prevRow;
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
