import { Dispatch, SetStateAction } from "react"
import { KeyboardReactInterface } from "react-simple-keyboard";

export type HardModeToggleProps = {
  isHardMode: boolean;
  setIsHardMode: Dispatch<SetStateAction<boolean>>;
  resetGameAndCloseModal: () => void;

}

export type BoardProps = {
  inputValues: string[];
  targetWordlength: number;
  handleInputChange: (value: string) => void;
  validationResults: ValidationResult[][];
}

export type RowProps = {
  inputValues: string[];
  rowIndex: number;
  targetWordlength: number;
  handleInputChange: (word: string) => void;
  validationResults: ValidationResult[][];
};

export type AnswerSpecifierProps = {
  wordList: string[];
  selectedWord: string;
  setSelectedWord: Dispatch<SetStateAction<string>>;
  handleInputChange: (word: string) => void;
  setCurrentRow: Dispatch<SetStateAction<number>>;
  handleGuessSubmit: (guess: string) => void;
  availableWords: string[];
  isHardMode: boolean;
  containsAllValidLetters: (input: string) => boolean;
}

export type KeyboardProps = {
  inputValues: string[];
  currentRow: number;
  setCurrentRow: Dispatch<SetStateAction<number>>;
  updateKeyboardRef: (keyboard: KeyboardReactInterface) => void;
  targetWordLength: number;
  handleInputChange: (value: string) => void;
  handleGuessSubmit: (guess: string) => void;
  updateButtonColors: (keyboard: KeyboardReactInterface, validationResults: ValidationResult[][], addColors: boolean) => void;
  validationResults: ValidationResult[][];
  isHardMode: boolean;
  containsAllValidLetters: (input: string) => boolean;
};

export type ValidationResult = {
  letter: string;
  status: 'correct' | 'present' | 'wrong';
};

export type FinishedmodalProps = {
  isOpen: boolean;
  isWinner: boolean | null;
  targetWord: string;
  resetGame: () => void;
}

export type ResetButtonProps = {
  resetGameAndCloseModal: () => void;
}