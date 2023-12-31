import {
  Flex,
  Switch,
  Heading,
} from "@chakra-ui/react";
import { HardModeToggleProps } from "../../types";

export const HardModeToggle = ({
  isHardMode,
  setIsHardMode,
  resetGameAndCloseModal
}: HardModeToggleProps) => {
  const hardModeText = 'Hard Mode: '

  const handleToggle = () => {
    setIsHardMode(!isHardMode);
    resetGameAndCloseModal();
  }
  return (
    <Flex mt={3} ml={8}>
      <Heading size='xs'>
        {hardModeText}
      </Heading>
      <Switch
        data-testid="hard-mode"
        ml={2}
        colorScheme="red"
        onChange={handleToggle} />
    </Flex>
  )
}