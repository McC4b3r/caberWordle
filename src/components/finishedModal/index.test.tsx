import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FinishedModal } from '.';

describe('FinishedModal', () => {
  it('renders "Victory!" modal when isWinner is true', () => {
    render(
      <FinishedModal
        isWinner={true}
        isOpen={true}
        targetWord="apple"
        resetGame={() => { }}
      />
    );
    expect(screen.getByText('Victory!')).toBeInTheDocument();
    expect(screen.getByText('You correctly guessed the word: apple')).toBeInTheDocument();
    expect(screen.getByText('Play Again?')).toBeInTheDocument();
  });

  it('renders "Game Over" modal when isWinner is false', () => {
    render(
      <FinishedModal
        isWinner={false}
        isOpen={true}
        targetWord="apple"
        resetGame={() => { }}
      />
    );
    expect(screen.getByText('Game Over')).toBeInTheDocument();
    expect(screen.getByText('The word was: apple')).toBeInTheDocument();
    expect(screen.getByText('Play Again?')).toBeInTheDocument();
  });

  it('calls resetGame when "Play Again?" button is clicked', () => {
    const resetGameMock = jest.fn();
    render(
      <FinishedModal
        isWinner={true}
        isOpen={true}
        targetWord="apple"
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
        isWinner={null}
        isOpen={false}
        targetWord="apple"
        resetGame={() => { }}
      />
    );
    expect(screen.queryByText('Victory!')).not.toBeInTheDocument();
    expect(screen.queryByText('Game Over')).not.toBeInTheDocument();
  });
});
