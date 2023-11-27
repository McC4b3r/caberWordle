import { validateGuess, getBackgroundColor } from './utils';
import { ValidationResult } from './types';

describe('validateGuess', () => {
  const targetWord = 'claim';

  it('marks all letters as correct if the guess matches the target word', () => {
    const guess = 'claim';
    const expected: ValidationResult[] = [
      { letter: 'c', status: 'correct' },
      { letter: 'l', status: 'correct' },
      { letter: 'a', status: 'correct' },
      { letter: 'i', status: 'correct' },
      { letter: 'm', status: 'correct' }
    ];
    expect(validateGuess(guess, targetWord)).toEqual(expected);
  });

  it('marks letters as correct, present, and wrong correctly for a mixed guess', () => {
    const guess = 'clams';
    const expected: ValidationResult[] = [
      { letter: 'c', status: 'correct' },
      { letter: 'l', status: 'correct' },
      { letter: 'a', status: 'correct' },
      { letter: 'm', status: 'present' },
      { letter: 's', status: 'wrong' }
    ];
    expect(validateGuess(guess, targetWord)).toEqual(expected);
  });

  it('marks all letters as wrong if none are present in the target word', () => {
    const guess = 'north';
    const expected: ValidationResult[] = [
      { letter: 'n', status: 'wrong' },
      { letter: 'o', status: 'wrong' },
      { letter: 'r', status: 'wrong' },
      { letter: 't', status: 'wrong' },
      { letter: 'h', status: 'wrong' }
    ];
    expect(validateGuess(guess, targetWord)).toEqual(expected);
  });
});

describe('getBackgroundColor', () => {
  it('returns green for correct status', () => {
    const result: ValidationResult = { letter: 'a', status: 'correct' };
    expect(getBackgroundColor(result)).toEqual('green');
  });

  it('returns yellow for present status', () => {
    const result: ValidationResult = { letter: 'a', status: 'present' };
    expect(getBackgroundColor(result)).toEqual('yellow');
  });

  it('returns grey for wrong status', () => {
    const result: ValidationResult = { letter: 'a', status: 'wrong' };
    expect(getBackgroundColor(result)).toEqual('grey');
  });
});
