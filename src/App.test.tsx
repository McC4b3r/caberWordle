import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react';
import { customRender } from './test-utils';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve('apple'),
        headers: new Headers(),
        ok: true,
        redirected: false,
        status: 200,
        statusText: 'OK',
      } as unknown as Response)
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderAppAndWait = async () => {
    render(<App />);
    await waitFor(() => expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument());
  };

  it('initializes with the correct default state', () => {
    render(<App />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    cleanup();
  });

  it('renders the appropriate components after initial data fetch', async () => {
    await renderAppAndWait();
    expect(screen.getByTestId('word-board')).toBeInTheDocument();
    expect(screen.getByTestId('virtual-keyboard')).toBeInTheDocument();
    expect(screen.getByTestId('answer-specifier')).toBeInTheDocument();
  });

  it('resets the inputValues to empty strings when "Reset Game" button is clicked', async () => {
    const mockWord = 'plums';
    await renderAppAndWait();

    const selectElement = screen.getByTestId('select-possible-answers');
    const guessButton = screen.getByText('Guess');

    const optionElement = document.createElement('option');
    optionElement.text = mockWord;
    optionElement.value = mockWord;
    selectElement.appendChild(optionElement);

    fireEvent.change(selectElement, { target: { value: mockWord } });
    fireEvent.click(guessButton);

    const pinInputFields = screen.getAllByRole('textbox');
    const firstRow = pinInputFields.slice(0, 5);

    expect(firstRow.map((input) => (
      input as HTMLInputElement).value)).toEqual(['p', 'l', 'u', 'm', 's']);

    const resetButton = screen.getByText('Reset Game');
    fireEvent.click(resetButton);

    pinInputFields.forEach((input) => {
      expect((input as HTMLInputElement).value).toEqual('');
    });
  });

  // reusable function to share between physical keyboard and virtual keyboard submit methods
  const simulateSuccessAttempt = async (mockWord: string, submitMethod: () => void) => {
    await renderAppAndWait();
    const pinInputFields = screen.getAllByRole('textbox');
    const firstRow = pinInputFields.slice(0, 5);
    //simulate rows being filled with letters of word
    firstRow.forEach((input, index) => fireEvent.change(input, { target: { value: mockWord[index] } }));
    submitMethod()
    firstRow.forEach((input) => expect(input).toHaveStyle({ backgroundColor: 'green' }));
    expect(screen.getByText('Victory!')).toBeInTheDocument();
    expect(screen.getByText(`You correctly guessed the word: ${mockWord}`)).toBeInTheDocument();
  };

  it('handles win scenario via physical Keyboard', async () => {
    await simulateSuccessAttempt('apple', () => {
      fireEvent.keyDown(document.body, { key: 'Enter' });
    });
  });

  it('handles win scenario via virtual keyboard', async () => {
    await simulateSuccessAttempt('apple', () => {
      const virtualKeyboardEnter = screen.getByText('< enter');
      fireEvent.click(virtualKeyboardEnter);
    });
  });

  it('handles loss scenario', async () => {
    const mockWord = 'north';
    await renderAppAndWait();

    const simulateFailureAttempt = async (row: HTMLInputElement[]) => {
      for (let i = 0; i < 5; i++) {
        fireEvent.change(row[i], { target: { value: mockWord[i] } });
      }

      fireEvent.keyDown(document.body, { key: 'Enter' });
      row.forEach((input) => expect(input).toHaveStyle({ backgroundColor: 'grey' }));
    };

    // fill all rows with incorrect words to reach end game state
    for (let i = 0; i < 6; i++) {
      await simulateFailureAttempt(Array.from(screen.getAllByRole('textbox')).slice(i * 5, (i + 1) * 5) as HTMLInputElement[]);
    }

    // Verify loss and display of the correct word
    expect(screen.getByText('Game Over')).toBeInTheDocument();
    expect(screen.getByText('The word was: apple')).toBeInTheDocument();
  });

  const testHardMode = async (
    initialWord: string,
    invalidWord: string,
    validWord: string,
    submitMethod: () => void
  ) => {
    customRender(<App />);
    await waitFor(() => expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument());

    // Toggle hard mode switch on
    const hardModeSwitch = screen.getByTestId('hard-mode');
    fireEvent.click(hardModeSwitch);

    const pinInputFields = screen.getAllByRole('textbox');

    // Set the first row to the initial word
    const firstRow = pinInputFields.slice(0, 5);
    firstRow.forEach((input, index) => {
      fireEvent.change(input, { target: { value: initialWord[index] } });
    });

    // Submit the first row using the specified method
    submitMethod();

    // Set the second row to the invalid word
    const secondRow = pinInputFields.slice(5, 10);
    secondRow.forEach((input, index) => {
      fireEvent.change(input, { target: { value: invalidWord[index] } });
    });

    // Attempt to submit the second row using the specified method
    submitMethod();

    // Verify that a toast notification appears for invalid submission
    await waitFor(() => {
      expect(screen.getByText('Invalid Submission')).toBeInTheDocument();
    });

    const resetButton = screen.getByText('Reset Game');
    fireEvent.click(resetButton);

    // Set the first row to the valid word
    const firstRowAgain = pinInputFields.slice(0, 5);
    firstRowAgain.forEach((input, index) => {
      fireEvent.change(input, { target: { value: validWord[index] } });
    });

    // Submit the first row using the specified method
    submitMethod();

    // Verify that the submission is accepted
    expect(screen.getByText('Victory!')).toBeInTheDocument();
    expect(screen.getByText(`You correctly guessed the word: ${validWord}`)).toBeInTheDocument();
  };

  it('handles hard mode with Enter key', async () => {
    await testHardMode('faces', 'north', 'apple', () => {
      fireEvent.keyDown(document.body, { key: 'Enter' });
    });
  });

  it('handles hard mode with virtual keyboard Enter key', async () => {
    await testHardMode('faces', 'north', 'apple', () => {
      const virtualKeyboardEnter = screen.getByText('< enter');
      fireEvent.click(virtualKeyboardEnter);
    });
  });

  it('handles hard mode with Answer Specifier', async () => {
    customRender(<App />);
    await waitFor(() => expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument());

    const hardModeSwitch = screen.getByTestId('hard-mode');
    fireEvent.click(hardModeSwitch);

    const selectElement = screen.getByTestId('select-possible-answers');
    const guessButton = screen.getByText('Guess');

    const options = ['faces', 'north', 'apple'];

    // add words to the available words dropdown, and attempt to select and submit them
    for (const word of options) {
      const optionElement = document.createElement('option');
      optionElement.text = word;
      optionElement.value = word;
      selectElement.appendChild(optionElement);
      fireEvent.change(selectElement, { target: { value: word } });
      fireEvent.click(guessButton);
    }

    // toast should show up and not allow valid(last) word submission due to invalid middle word
    await waitFor(() => {
      expect(screen.getByText('Invalid Submission')).toBeInTheDocument();
    });

    const resetButton = screen.getByText('Reset Game');
    fireEvent.click(resetButton);

    // select only valid word and submit
    fireEvent.change(selectElement, { target: { value: options[2] } });
    fireEvent.click(guessButton);

    expect(screen.getByText('Victory!')).toBeInTheDocument();
    expect(screen.getByText('You correctly guessed the word: apple')).toBeInTheDocument();
  });

});
