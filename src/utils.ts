import { ValidationResult } from "./types";

export const validateGuess = (guess: string, targetWord: string): ValidationResult[] => {
  return guess.split('').map((letter, index) => {
    if (letter === targetWord[index]) {
      return { letter, status: 'correct' };
    } else if (targetWord.includes(letter)) {
      return { letter, status: 'present' };
    } else {
      return { letter, status: 'wrong' };
    }
  });
};

export const getBackgroundColor = (result: ValidationResult | undefined) => {
  if (!result) return 'defaultColor';
  switch (result?.status) {
    case 'correct':
      return 'green';
    case 'present':
      return 'yellow';
    case 'wrong':
      return 'grey';
    default:
      return 'white';
  }
};