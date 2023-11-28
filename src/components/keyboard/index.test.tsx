import { render, screen, fireEvent } from '@testing-library/react';
import { Keyboard } from '.';
import { GameState } from '../../types';

describe('Keyboard', () => {
  const mockGameState: GameState = {
    inputValues: ['put', 'row', 'nom', ''],
    validationResults: [[]],
    currentRow: 1,
    targetWord: 'apple',
    selectedWord: '',
    isWinner: null,
  };
  const mockUpdateGameState = jest.fn();
  const mockHandleInputChange = jest.fn();
  const mockHandleGuessSubmit = jest.fn();

  it('applies virtual keyboard input to the correct index of inputValues when a key is clicked', () => {

    render(
      <Keyboard
        gameState={mockGameState}
        updateGameState={mockUpdateGameState}
        updateKeyboardRef={() => { }}
        handleInputChange={mockHandleInputChange}
        handleGuessSubmit={mockHandleGuessSubmit}
        generateButtonColors={() => { }}
      />
    );

    const zKey = screen.getByText('Z');
    fireEvent.click(zKey);

    expect(mockHandleInputChange).toHaveBeenCalledWith('rowZ', expect.anything());
  });

  it('updates the input at the correct index position when currentRow changes', () => {
    let newRow = 2;
    const altered: GameState = {
      ...mockGameState,
      currentRow: newRow,
    }

    const { rerender } = render(
      <Keyboard
        gameState={altered}
        updateGameState={mockUpdateGameState}
        updateKeyboardRef={() => { }}
        handleInputChange={mockHandleInputChange}
        handleGuessSubmit={mockHandleGuessSubmit}
        generateButtonColors={() => { }}
      />
    );

    const zKey = screen.getByText('Z');
    fireEvent.click(zKey);

    expect(mockHandleInputChange).toHaveBeenCalledWith('nomZ', expect.anything());
    const newerRow = 3;
    const altered2: GameState = {
      ...mockGameState,
      currentRow: newerRow
    }
    rerender(
      <Keyboard
        gameState={altered2}
        updateGameState={mockUpdateGameState}
        updateKeyboardRef={() => { }}
        handleInputChange={mockHandleInputChange}
        handleGuessSubmit={mockHandleGuessSubmit}
        generateButtonColors={() => { }}
      />
    );

    fireEvent.click(zKey);

    expect(mockHandleInputChange).toHaveBeenCalledWith('Z', expect.anything());
  });
});
