import { useEffect, useRef } from "react";
import KeyboardReact from "react-simple-keyboard";
import { defaultLayout } from "./layout";
import "react-simple-keyboard/build/css/index.css";
import { Box } from "@chakra-ui/react";
import { KeyboardProps } from "../../types";
import './keycolors.css';

export const Keyboard = ({
  gameState,
  updateGameState,
  updateKeyboardRef,
  handleInputChange,
  handleGuessSubmit,
  generateButtonColors,
}: KeyboardProps) => {
  const { inputValues, currentRow, validationResults, targetWord } = gameState
  const keyboard = useRef<any>();

  // used to change the color of the virtual keyboard key colors
  useEffect(() => {
    generateButtonColors(keyboard.current, validationResults);
    keyboard.current.setInput(inputValues[currentRow]);
  }, [keyboard, generateButtonColors, inputValues, currentRow, validationResults]);

  // handles the keystroke entries and the guess submission via pressing the virtual enter key
  const onKeyPress = (button: string) => {
    if (button === "{enter}" && inputValues[currentRow].length === targetWord.length) {
      handleGuessSubmit(inputValues[currentRow]);

      // moves focus to new row and resets input to allow new guess
      updateGameState((prevState) => {
        const newCurrentRow = prevState.currentRow < 5 ? prevState.currentRow + 1 : prevState.currentRow;
        return {
          ...prevState,
          currentRow: newCurrentRow,
        };
      });
      keyboard.current.setInput("");
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
        maxLength={targetWord.length}
      />
    </Box>
  );
};
