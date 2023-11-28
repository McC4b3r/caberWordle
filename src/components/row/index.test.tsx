import { render, fireEvent, screen } from '@testing-library/react';
import { Row } from '.';
import { AnswerSpecifier } from '../answerSpecifier';
import { ValidationResult } from '../../types';

describe('Row', () => {
  const mockGameState = {
    inputValues: ['', '', '', '', '', ''],
    validationResults: [[], [], [], [], [], []],
    currentRow: 0,
    targetWord: 'apple',
    selectedWord: '',
    isWinner: null,
  };
  const mockHandleInputChange = jest.fn();

  it('renders the correct number of PinInputFields', () => {
    render(
      <Row
        gameState={mockGameState}
        rowIndex={0}
        handleInputChange={mockHandleInputChange}
      />
    );

    const pinInputFields = screen.getAllByRole('textbox');
    expect(pinInputFields).toHaveLength(mockGameState.targetWord.length);
  });

  it('sets the correct backgroundColor based on validationResults', () => {
    const mockValidationResults: ValidationResult[][] = [
      [
        { letter: 'm', status: 'correct' },
        { letter: 'o', status: 'present' },
        { letter: 'n', status: 'wrong' },
        { letter: 'e', status: 'correct' },
        { letter: 'y', status: 'wrong' }
      ],
    ];
    const altered = {
      ...mockGameState,
      validationResults: mockValidationResults
    };

    render(
      <Row
        gameState={altered}
        rowIndex={0}
        handleInputChange={mockHandleInputChange}
      />
    );

    const pinInputFields = screen.getAllByRole('textbox');
    expect(pinInputFields[0]).toHaveStyle({ backgroundColor: 'green' });
    expect(pinInputFields[1]).toHaveStyle({ backgroundColor: 'yellow' });
    expect(pinInputFields[2]).toHaveStyle({ backgroundColor: 'grey' });
    expect(pinInputFields[3]).toHaveStyle({ backgroundColor: 'green' });
    expect(pinInputFields[4]).toHaveStyle({ backgroundColor: 'grey' });
  });


  it('calls handleInputChange when PinInputField value changes', () => {
    const newInputValues = ['apple'];
    const selectedWord = 'apple';
    const altered = {
      ...mockGameState,
      inputValues: newInputValues,
      selectedWord,
    }
    const mockUpdateGameState = jest.fn();
    render(
      <div>
        <AnswerSpecifier
          gameState={altered}
          updateGameState={mockUpdateGameState}
          wordList={[]}
          handleInputChange={() => { }}
          handleGuessSubmit={() => { }}
          availableWords={[]}
        />
        <Row
          gameState={altered}
          rowIndex={0}
          handleInputChange={() => { }}
        />
      </div>
    );

    const guessButton = screen.getByText('Guess');
    fireEvent.click(guessButton);

    const pinInputFields = screen.getAllByRole('textbox');
    expect(pinInputFields.map((input) => (
      input as HTMLInputElement).value)).toEqual(['a', 'p', 'p', 'l', 'e']);
  });

});
