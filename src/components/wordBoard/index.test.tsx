import { render, screen } from '@testing-library/react';
import { WordBoard } from '.';
import { MAX_ROWS } from '../../constants';

describe('WordBoard', () => {
  const mockGameState = {
    inputValues: ['', '', '', '', '', ''],
    validationResults: [[], [], [], [], [], []],
    currentRow: 0,
    targetWord: '',
    selectedWord: '',
    isWinner: null,
  };
  const mockHandleInputChange = jest.fn();

  it('renders the correct number of Rows', () => {
    render(
      <WordBoard
        gameState={mockGameState}
        handleInputChange={mockHandleInputChange}
      />
    );

    const rows = screen.getAllByTestId('row');
    expect(rows).toHaveLength(MAX_ROWS);
  });
});
