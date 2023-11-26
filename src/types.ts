import { Dispatch, SetStateAction } from "react"

export type GameProps = {
  length: number;
  inputValues: string[];
  currentRow: number;
  handleInputChange: (value: string) => void;
  validationResults: ValidationResult[][];
}

export type RowProps = {
  length: number;
  inputValues: string[];
  rowIndex: number;
  currentRow: number;
  handleInputChange: (word: string) => void;
  validationResults: ValidationResult[][];
};

export type KeyboardProps = GameProps & {
  handleGuessSubmit: (guess: string) => void;
  setCurrentRow: Dispatch<SetStateAction<number>>;
};

export type ValidationResult = {
  letter: string;
  status: 'correct' | 'present' | 'wrong';
};

export type AnswerSpecifierProps = {
  wordList: string[];
  length: number;
  handleInputChange: (word: string) => void;
  setCurrentRow: Dispatch<SetStateAction<number>>;
  handleGuessSubmit: (guess: string) => void;
  availableWords: string[];
}

export type FinishedmodalProps = {
  isWinner: boolean | null;
  isOpen: boolean;
  targetWord: string;
  resetGame: () => void;
}