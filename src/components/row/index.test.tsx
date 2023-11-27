import { render, fireEvent, screen } from '@testing-library/react';
import { Row } from '.';
import { AnswerSpecifier } from '../answerSpecifier';
import { ValidationResult } from '../../types';

describe('Row', () => {
  const mockHandleInputChange = jest.fn();

  it('renders the correct number of PinInputFields', () => {
    const length = 5;
    render(
      <Row
        inputValues={Array(length).fill('')}
        rowIndex={0}
        length={length}
        handleInputChange={mockHandleInputChange}
        validationResults={[]}
      />
    );

    const pinInputFields = screen.getAllByRole('textbox');
    expect(pinInputFields).toHaveLength(length);
  });

  it('sets the correct backgroundColor based on validationResults', () => {
    const length = 5;
    const validationResults: ValidationResult[][] = [
      [
        { letter: 'm', status: 'correct' },
        { letter: 'o', status: 'present' },
        { letter: 'n', status: 'wrong' },
        { letter: 'e', status: 'correct' },
        { letter: 'y', status: 'wrong' }
      ]
    ];

    render(
      <Row
        inputValues={Array(length).fill('')}
        rowIndex={0}
        length={length}
        handleInputChange={mockHandleInputChange}
        validationResults={validationResults}
      />
    );

    const pinInputFields = screen.getAllByRole('textbox');
    expect(pinInputFields[0]).toHaveStyle('backgroundColor: green');
    expect(pinInputFields[1]).toHaveStyle('backgroundColor: yellow');
    expect(pinInputFields[2]).toHaveStyle('backgroundColor: grey');
    expect(pinInputFields[3]).toHaveStyle('backgroundColor: green');
    expect(pinInputFields[4]).toHaveStyle('backgroundColor: grey');
  });

  it('calls handleInputChange when PinInputField value changes', () => {
    const mockWord = 'apple';
    const inputValues = ['apple']
    render(
      <div>
        <AnswerSpecifier
          wordList={[]}
          selectedWord={mockWord}
          setSelectedWord={() => { }}
          handleInputChange={() => { }}
          setCurrentRow={() => { }}
          handleGuessSubmit={() => { }}
          availableWords={[]}
        />
        <Row
          length={mockWord.length}
          inputValues={inputValues}
          rowIndex={0}
          handleInputChange={() => { }}
          validationResults={[]}
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
