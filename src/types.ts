import { Dispatch, SetStateAction } from "react"

export type BoardProps = {
  targetWordlength: number;
  inputValues: string[];
  handleInputChange: (value: string) => void;
  validationResults: ValidationResult[][];
}

export type RowProps = {
  targetWordlength: number;
  inputValues: string[];
  rowIndex: number;
  handleInputChange: (word: string) => void;
  validationResults: ValidationResult[][];
};

export type KeyboardProps = {
  updateKeyboardRef: (keyboard: any) => void;
  targetWordLength: number;
  inputValues: string[];
  currentRow: number;
  handleInputChange: (value: string) => void;
  handleGuessSubmit: (guess: string) => void;
  setCurrentRow: Dispatch<SetStateAction<number>>;
  updateButtonColors: (keyboard: any, validationResults: ValidationResult[][], addColors: boolean) => void;
  validationResults: ValidationResult[][];
  containsAllValidLetters: (input: string) => boolean;
  isHardMode: boolean;
};

export type ValidationResult = {
  letter: string;
  status: 'correct' | 'present' | 'wrong';
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

export type FinishedmodalProps = {
  isWinner: boolean | null;
  isOpen: boolean;
  targetWord: string;
  resetGame: () => void;
}

export type ResetButtonProps = {
  resetGameAndCloseModal: () => void;
}

export type HardModeToggleProps = {
  isHardMode: boolean;
  setIsHardMode: Dispatch<SetStateAction<boolean>>;
}