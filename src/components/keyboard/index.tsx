import { useEffect, useRef } from "react";
import KeyboardReact from "react-simple-keyboard";
import { defaultLayout } from "./layout";
import "react-simple-keyboard/build/css/index.css";
import { Box } from "@chakra-ui/react";
import { KeyboardProps } from "../../types";
import './keycolors.css';

export const Keyboard = ({
  updateKeyboardRef,
  length,
  setCurrentRow,
  handleInputChange,
  inputValues,
  currentRow,
  handleGuessSubmit,
  generateButtonColors,
  validationResults,
}: KeyboardProps) => {
  const keyboard = useRef<any>();

  useEffect(() => {
    generateButtonColors(keyboard.current, validationResults);
    keyboard.current.setInput(inputValues[currentRow]);
  }, [keyboard, generateButtonColors, inputValues, currentRow, validationResults]);

  const onKeyPress = (button: string) => {
    if (button === "{enter}" && inputValues[currentRow].length === length) {
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
        maxLength={length}
      />
    </Box>
  );
};
