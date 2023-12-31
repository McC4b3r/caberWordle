import { render, screen, fireEvent } from '@testing-library/react';
import { Keyboard } from '.';

describe('Keyboard', () => {
  const mockSetCurrentRow = jest.fn();
  const mockHandleInputChange = jest.fn();
  const mockHandleGuessSubmit = jest.fn();
  const mockContainsAllValidLetters = jest.fn();
  const length = 5;

  it('applies virtual keyboard input to the correct index of inputValues when a key is clicked', () => {
    const inputValues = ['put', 'row', 'nom', ''];
    const currentRow = 1;

    render(
      <Keyboard
        isHardMode={false}
        containsAllValidLetters={mockContainsAllValidLetters}
        updateKeyboardRef={() => { }}
        targetWordLength={length}
        setCurrentRow={mockSetCurrentRow}
        handleInputChange={mockHandleInputChange}
        inputValues={inputValues}
        currentRow={currentRow}
        handleGuessSubmit={mockHandleGuessSubmit}
        validationResults={[]}
        updateButtonColors={() => { }}
      />
    );

    const zKey = screen.getByText('Z');
    fireEvent.click(zKey);

    expect(mockHandleInputChange).toHaveBeenCalledWith('rowZ', expect.anything());
  });

  it('updates the input at the correct index position when currentRow changes', () => {
    const inputValues = ['put', 'row', 'nom', ''];
    let currentRow = 2;

    const { rerender } = render(
      <Keyboard
        isHardMode={false}
        containsAllValidLetters={mockContainsAllValidLetters}
        updateKeyboardRef={() => { }}
        targetWordLength={length}
        setCurrentRow={mockSetCurrentRow}
        handleInputChange={mockHandleInputChange}
        inputValues={inputValues}
        currentRow={currentRow}
        handleGuessSubmit={mockHandleGuessSubmit}
        validationResults={[]}
        updateButtonColors={() => { }}
      />
    );

    const zKey = screen.getByText('Z');
    fireEvent.click(zKey);

    expect(mockHandleInputChange).toHaveBeenCalledWith('nomZ', expect.anything());

    currentRow = 3;
    rerender(
      <Keyboard
        isHardMode={false}
        containsAllValidLetters={mockContainsAllValidLetters}
        updateKeyboardRef={() => { }}
        targetWordLength={length}
        setCurrentRow={mockSetCurrentRow}
        handleInputChange={mockHandleInputChange}
        inputValues={inputValues}
        currentRow={currentRow}
        handleGuessSubmit={mockHandleGuessSubmit}
        validationResults={[]}
        updateButtonColors={() => { }}
      />
    );

    fireEvent.click(zKey);

    expect(mockHandleInputChange).toHaveBeenCalledWith('Z', expect.anything());
  });
});
