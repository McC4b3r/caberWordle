import { useRef, Dispatch, SetStateAction } from "react";
import KeyboardReact from "react-simple-keyboard";
import { defaultLayout } from "./layout";
import "react-simple-keyboard/build/css/index.css";
import { Box } from "@chakra-ui/react";

type KeyboardProps = {
  length: number;
  inputValues: string[];
  setInputValues: Dispatch<SetStateAction<string[]>>;
  currentRow: number;
  setCurrentRow: Dispatch<SetStateAction<number>>;
}

export const Keyboard = ({
  inputValues,
  setInputValues,
  currentRow,
  setCurrentRow,
  length
}: KeyboardProps) => {
  const keyboard = useRef<any>();

  const onChange = (input: string) => {
    const newValues = [...inputValues];
    newValues[currentRow] = input;
    setInputValues(newValues);
  };

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
        onChange={onChange}
        onKeyPress={onKeyPress}
        maxLength={length}
      />
    </Box>
  );
};
