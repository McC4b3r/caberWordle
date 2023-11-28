import { render, screen, fireEvent } from '@testing-library/react';
import { AnswerSpecifier } from '.';

describe('AnswerSpecifier', () => {
  const mockGameState = {
    inputValues: ['', '', '', '', '', ''],
    validationResults: [[], [], [], [], [], []],
    currentRow: 0,
    targetWord: '',
    selectedWord: '',
    isWinner: null,
  };
  const mockUpdateGameState = jest.fn();
  const mockHandleGuessSubmit = jest.fn();
  const mockHandleInputChange = jest.fn();
  const wordList = ['apple', 'banana', 'cherry'];
  const availableWords = ['banana', 'cherry'];

  it('displays the correct select options with line numbers based on wordList', () => {
    render(
      <AnswerSpecifier
        gameState={mockGameState}
        updateGameState={mockUpdateGameState}
        wordList={wordList}
        availableWords={availableWords}
        handleGuessSubmit={mockHandleGuessSubmit}
        handleInputChange={mockHandleInputChange}
      />
    );

    availableWords.forEach(word => {
      const lineNumber = wordList.indexOf(word) + 1;
      expect(screen.getByLabelText(word)).toHaveTextContent(`${lineNumber}: ${word}`);
    });
  });

  it('handles submit correctly when a word is selected and the button is clicked', () => {
    const altered = {
      ...mockGameState,
      selectedWord: 'banana',
    };

    render(
      <AnswerSpecifier
        gameState={altered}
        updateGameState={mockUpdateGameState}
        wordList={wordList}
        availableWords={availableWords}
        handleGuessSubmit={mockHandleGuessSubmit}
        handleInputChange={mockHandleInputChange}
      />
    );

    fireEvent.click(screen.getByText('Guess'));
    expect(mockHandleInputChange).toHaveBeenCalledWith(altered.selectedWord);
    expect(mockHandleGuessSubmit).toHaveBeenCalledWith(altered.selectedWord);
    expect(mockUpdateGameState).toHaveBeenCalledWith({ selectedWord: '', currentRow: altered.currentRow + 1 });
    expect(mockUpdateGameState).toHaveBeenCalled();
  });


  it('disables the Guess button when no word is selected', () => {
    render(
      <AnswerSpecifier
        gameState={mockGameState}
        updateGameState={mockUpdateGameState}
        wordList={wordList}
        availableWords={availableWords}
        handleGuessSubmit={mockHandleGuessSubmit}
        handleInputChange={mockHandleInputChange}
      />
    );

    expect(screen.getByText('Guess')).toBeDisabled();
  });

  it('enables the Guess button when a word is selected', () => {
    const altered = {
      ...mockGameState,
      selectedWord: 'banana',
    };

    render(
      <AnswerSpecifier
        gameState={altered}
        updateGameState={mockUpdateGameState}
        wordList={wordList}
        availableWords={availableWords}
        handleGuessSubmit={mockHandleGuessSubmit}
        handleInputChange={mockHandleInputChange}
      />
    );

    expect(screen.getByText('Guess')).not.toBeDisabled();
  });

});
