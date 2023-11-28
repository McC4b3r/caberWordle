import { render, screen, fireEvent } from '@testing-library/react';
import { FinishedModal } from '.';
import { GameState } from '../../types';

describe('FinishedModal', () => {
  const mockGameState: GameState = {
    inputValues: ['put', 'row', 'nom', ''],
    validationResults: [[]],
    currentRow: 1,
    targetWord: 'apple',
    selectedWord: '',
    isWinner: null,
  };

  it('renders "Victory!" modal when isWinner is true', () => {
    const winState: GameState = {
      ...mockGameState,
      isWinner: true,
      targetWord: 'apple'
    }
    render(
      <FinishedModal
        gameState={winState}
        isOpen={true}
        resetGame={() => { }}
      />
    );
    expect(screen.getByText('Victory!')).toBeInTheDocument();
    expect(screen.getByText('You correctly guessed the word: apple')).toBeInTheDocument();
    expect(screen.getByText('Play Again?')).toBeInTheDocument();
  });

  it('renders "Game Over" modal when isWinner is false', () => {
    const loseState: GameState = {
      ...mockGameState,
      isWinner: false,
      targetWord: 'apple',
    }

    render(
      <FinishedModal
        gameState={loseState}
        isOpen={true}
        resetGame={() => { }}
      />
    );
    expect(screen.getByText('Game Over')).toBeInTheDocument();
    expect(screen.getByText('The word was: apple')).toBeInTheDocument();
    expect(screen.getByText('Play Again?')).toBeInTheDocument();
  });

  it('calls resetGame when "Play Again?" button is clicked', () => {
    const winState: GameState = {
      ...mockGameState,
      isWinner: true,
      targetWord: 'apple'
    }
    const resetGameMock = jest.fn();

    render(
      <FinishedModal
        gameState={winState}
        isOpen={true}
        resetGame={resetGameMock}
      />
    );
    const playAgainButton = screen.getByText('Play Again?');
    fireEvent.click(playAgainButton);
    expect(resetGameMock).toHaveBeenCalled();
  });

  it('does not render the modal when isWinner is null', () => {
    render(
      <FinishedModal
        gameState={mockGameState}
        isOpen={false}
        resetGame={() => { }}
      />
    );
    expect(screen.queryByText('Victory!')).not.toBeInTheDocument();
    expect(screen.queryByText('Game Over')).not.toBeInTheDocument();
  });
});
