import { useRef, useEffect } from "react";
import KeyboardReact from "react-simple-keyboard";
import { defaultLayout } from "./layout";
import "react-simple-keyboard/build/css/index.css";
import { Box } from "@chakra-ui/react";
import { KeyboardProps } from "../../types";

export const Keyboard = ({
  length,
  setCurrentRow,
  handleInputChange,
  inputValues,
  currentRow,
  handleGuessSubmit
}: KeyboardProps) => {
  const keyboard = useRef<any>();

  useEffect(() => {
    keyboard.current.setInput(inputValues[currentRow]);
  }, [inputValues, currentRow]);

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
      mt={10}
      maxW="container.sm"
      mx="auto"
    >
      <KeyboardReact
        keyboardRef={r => (keyboard.current = r)}
        layout={defaultLayout}
        onChange={handleInputChange}
        onKeyPress={onKeyPress}
        maxLength={length}
      />
    </Box>
  );
};
