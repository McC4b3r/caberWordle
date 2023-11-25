import { ValidationResult } from "./types";

export const validateGuess = (guess: string, targetWord: string): ValidationResult[] => {
  const result: ValidationResult[] = [];

  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];
    if (letter === targetWord[i]) {
      result.push({ letter, status: 'correct' });
    } else if (targetWord.includes(letter)) {
      result.push({ letter, status: 'present' });
    } else {
      result.push({ letter, status: 'wrong' });
    }
  }
  console.log({ validation: result })

  return result;
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