import { useRef, Dispatch, SetStateAction } from "react";
import KeyboardReact from "react-simple-keyboard";
import { defaultLayout } from "./layout";
import "react-simple-keyboard/build/css/index.css";
import { Box } from "@chakra-ui/react";
import { KeyboardProps } from "../../types";

export const Keyboard = ({
  length,
  setCurrentRow,
  handleInputChange,
}: KeyboardProps) => {
  const keyboard = useRef<any>();

  const onKeyPress = (button: string) => {
    // console.log("Button pressed", button);

    if (button === "{enter}") {
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
