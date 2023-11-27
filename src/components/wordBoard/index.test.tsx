import { render, screen } from '@testing-library/react';
import { WordBoard } from '.';

describe('WordBoard', () => {
  const mockHandleInputChange = jest.fn();
  const length = 5;
  const inputValues = Array(6).fill('');
  const validationResults = Array(6).fill([]);

  it('renders the correct number of Rows', () => {
    render(
      <WordBoard
        length={length}
        inputValues={inputValues}
        handleInputChange={mockHandleInputChange}
        validationResults={validationResults}
        currentRow={0}
      />
    );

    const rows = screen.getAllByTestId('row');
    expect(rows).toHaveLength(6);
  });
});
