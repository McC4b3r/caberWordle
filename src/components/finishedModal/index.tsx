import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from '@chakra-ui/react';
import { FinishedmodalProps } from '../../types';

export const FinishedModal = ({
  isWinner,
  isOpen,
  targetWord,
  resetGame,
}: FinishedmodalProps) => {

  const modalTitle = isWinner ? "Victory!" : "Game Over";
  const modalBody = isWinner
    ? `You correctly guessed the word: ${targetWord}`
    : `The word was: ${targetWord}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetGame}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalBody>
          <p>{modalBody}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={resetGame}>
            Play Again?
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
