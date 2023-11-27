import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react';
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
    const guessButton = screen.getByText('Guess')

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

  it('handles win scenario', async () => {
    const mockWord: string = 'apple';
    await renderAppAndWait();

    const pinInputFields: HTMLInputElement[] = screen.getAllByRole('textbox');
    const firstRow: HTMLInputElement[] = pinInputFields.slice(0, 5);

    const simulateSuccessAttempt = async () => {
      firstRow.forEach((input, index) => fireEvent.change(input, { target: { value: mockWord[index] } }));

      const expectedValue: string[] = ['a', 'p', 'p', 'l', 'e'];
      expect(firstRow.map((input) => input.value)).toEqual(expectedValue);

      fireEvent.keyDown(document.body, { key: 'Enter' });

      firstRow.forEach((input) => expect(input).toHaveStyle({ backgroundColor: 'green' }));
    };

    await simulateSuccessAttempt();

    expect(screen.getByText('Victory!')).toBeInTheDocument();
    expect(screen.getByText('You correctly guessed the word: apple')).toBeInTheDocument();
  });

  it('handles loss scenario', async () => {
    const mockWord: string = 'north';
    await renderAppAndWait();

    const pinInputFields: HTMLInputElement[] = screen.getAllByRole('textbox');

    const simulateFailureAttempt = async (row: HTMLInputElement[]) => {
      row.forEach((input, index) => fireEvent.change(input, { target: { value: mockWord[index] } }));

      expect(row.map((input) => input.value)).toEqual(['n', 'o', 'r', 't', 'h']);

      fireEvent.keyDown(document.body, { key: 'Enter' });

      row.forEach((input) => expect(input).toHaveStyle({ backgroundColor: 'grey' }));
    };

    for (let i = 0; i < 6; i++) {
      const row: HTMLInputElement[] = pinInputFields.slice(i * 5, (i + 1) * 5);
      await simulateFailureAttempt(row);
    }

    expect(screen.getByText('Game Over')).toBeInTheDocument();
    expect(screen.getByText('The word was: apple')).toBeInTheDocument();
  });


});
