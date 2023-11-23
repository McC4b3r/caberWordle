import React, { useRef, useState } from "react";
import KeyboardReact from "react-simple-keyboard";
import { defaultLayout } from "./layout";
import "react-simple-keyboard/build/css/index.css";
import { Box } from "@chakra-ui/react";

export const Keyboard = () => {
  const [input, setInput] = useState("");
  const keyboard = useRef<any>();

  const onChange = (input: string) => {
    setInput(input);
    console.log("Input changed", input);
  };

  const onKeyPress = (button: string) => {
    console.log("Button pressed", button);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setInput(input);
    keyboard.current?.setInput(input);
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
      />
    </Box>
  );
};
