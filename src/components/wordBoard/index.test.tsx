import { render, screen } from '@testing-library/react';
import { WordBoard } from '.';
import { GUESS_ATTEMPTS } from '../../constants';

describe('WordBoard', () => {
  const mockHandleInputChange = jest.fn();
  const length = 5;
  const inputValues = Array(GUESS_ATTEMPTS).fill('');
  const validationResults = Array(GUESS_ATTEMPTS).fill([]);

  it('renders the correct number of Rows', () => {
    render(
      <WordBoard
        targetWordlength={length}
        inputValues={inputValues}
        handleInputChange={mockHandleInputChange}
        validationResults={validationResults}
      />
    );

    const rows = screen.getAllByTestId('row');
    expect(rows).toHaveLength(6);
  });
});
