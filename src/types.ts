import { Dispatch, SetStateAction } from "react"

export type WordBoardProps = {
  length: number;
  inputValues: string[];
  handleInputChange: (value: string) => void;
  setCurrentRow: Dispatch<SetStateAction<number>>;
}

export type RowProps = {
  length: number;
  inputValues: string[];
  rowIndex: number;
  handleInputChange: (word: string) => void;
};

export type KeyboardProps = {
  length: number;
  inputValues: string[];
  currentRow: number;
  setCurrentRow: Dispatch<SetStateAction<number>>;
  handleInputChange: (value: string) => void;
}