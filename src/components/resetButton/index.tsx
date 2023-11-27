import { Button } from "@chakra-ui/react";
import { ResetButtonProps } from "../../types";

export const ResetButton = ({
  resetGameAndCloseModal,
}: ResetButtonProps) => {
  return (
    <Button onClick={resetGameAndCloseModal}>Reset Game</Button>
  )
}