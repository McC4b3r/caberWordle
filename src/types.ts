import { Dispatch, SetStateAction } from "react"

// export type WordBoardProps = {
//   length: number;
//   inputValues: string[];
//   currentRow: number;
//   handleInputChange: (value: string) => void;
//   setCurrentRow: Dispatch<SetStateAction<number>>;
//   validationResults?: ValidationResult[][];
// }

export type GameProps = {
  length: number;
  inputValues: string[];
  currentRow: number;
  handleInputChange: (value: string) => void;
  setCurrentRow: Dispatch<SetStateAction<number>>;
  validationResults?: ValidationResult[][];
}

export type RowProps = {
  length: number;
  inputValues: string[];
  rowIndex: number;
  currentRow: number;
  handleInputChange: (word: string) => void;
  validationResults?: ValidationResult[][];
};

export type KeyboardProps = GameProps & {
  handleGuessSubmit: (guess: string) => void;
};

// export type KeyboardProps = {
//   length: number;
//   inputValues: string[];
//   currentRow: number;
//   handleInputChange: (value: string) => void;
//   setCurrentRow: Dispatch<SetStateAction<number>>;
//   validationResults?: ValidationResult[][];
// }

export type ValidationResult = {
  letter: string;
  status: 'correct' | 'present' | 'wrong';
};