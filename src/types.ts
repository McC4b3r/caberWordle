import { Dispatch, SetStateAction } from "react"

export type WordBoardProps = {
  length: number;
  inputValues: string[];
  handleInputChange: (value: string) => void;
  setCurrentRow: Dispatch<SetStateAction<number>>;
}

export type RowProps = {
  rowIndex: number;
  inputValues: string[];
  length: number;
  handleInputChange: (word: string) => void;
};

export type KeyboardProps = {
  length: number;
  setCurrentRow: Dispatch<SetStateAction<number>>;
  handleInputChange: (value: string) => void;
}