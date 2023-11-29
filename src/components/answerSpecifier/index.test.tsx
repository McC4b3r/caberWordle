import { render, screen, fireEvent } from '@testing-library/react';
import { AnswerSpecifier } from '.';

describe('AnswerSpecifier', () => {
  const mockSetSelectedWord = jest.fn();
  const mockSetCurrentRow = jest.fn();
  const mockHandleGuessSubmit = jest.fn();
  const mockHandleInputChange = jest.fn();
  const mockContainsAllValidLetters = jest.fn();
  const wordList = ['apple', 'banana', 'cherry'];
  const availableWords = ['banana', 'cherry'];

  it('displays the correct select options with line numbers based on wordList', () => {
    render(
      <AnswerSpecifier
        isHardMode={false}
        containsAllValidLetters={mockContainsAllValidLetters}
        wordList={wordList}
        availableWords={availableWords}
        selectedWord=''
        setSelectedWord={mockSetSelectedWord}
        setCurrentRow={mockSetCurrentRow}
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
    const selectedWord = 'banana';

    render(
      <AnswerSpecifier
        isHardMode={false}
        containsAllValidLetters={mockContainsAllValidLetters}
        wordList={wordList}
        availableWords={availableWords}
        selectedWord={selectedWord}
        setSelectedWord={mockSetSelectedWord}
        setCurrentRow={mockSetCurrentRow}
        handleGuessSubmit={mockHandleGuessSubmit}
        handleInputChange={mockHandleInputChange}
      />
    );

    fireEvent.click(screen.getByText('Guess'));
    expect(mockHandleInputChange).toHaveBeenCalledWith(selectedWord);
    expect(mockHandleGuessSubmit).toHaveBeenCalledWith(selectedWord);
    expect(mockSetSelectedWord).toHaveBeenCalledWith('');
    expect(mockSetCurrentRow).toHaveBeenCalled();
  });

  it('disables the Guess button when no word is selected', () => {
    render(
      <AnswerSpecifier
        isHardMode={false}
        containsAllValidLetters={mockContainsAllValidLetters}
        wordList={wordList}
        availableWords={availableWords}
        selectedWord=''
        setSelectedWord={mockSetSelectedWord}
        setCurrentRow={mockSetCurrentRow}
        handleGuessSubmit={mockHandleGuessSubmit}
        handleInputChange={mockHandleInputChange}
      />
    );

    expect(screen.getByText('Guess')).toBeDisabled();
  });

  it('enables the Guess button when a word is selected', () => {
    render(
      <AnswerSpecifier
        isHardMode={false}
        containsAllValidLetters={mockContainsAllValidLetters}
        wordList={wordList}
        availableWords={availableWords}
        selectedWord='banana'
        setSelectedWord={mockSetSelectedWord}
        setCurrentRow={mockSetCurrentRow}
        handleGuessSubmit={mockHandleGuessSubmit}
        handleInputChange={mockHandleInputChange}
      />
    );

    expect(screen.getByText('Guess')).not.toBeDisabled();
  });
});
