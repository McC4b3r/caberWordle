import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve('word1\nword2\nword3'),
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

  it('initializes with the correct default state', () => {
    render(<App />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    cleanup();
  });


  it('renders the appropriate components after initial data fetch', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('word-board')).toBeInTheDocument();
    expect(screen.getByTestId('virtual-keyboard')).toBeInTheDocument();
    expect(screen.getByTestId('answer-specifier')).toBeInTheDocument();
  });

  it('resets the inputValues to empty strings when "Reset Game" button is clicked', async () => {
    const mockWord = 'apple';

    render(
      <App />
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    const selectElement = screen.getByTestId('select-possible-answers');
    const guessButton = screen.getByText('Guess')
    const optionElement = document.createElement('option');
    optionElement.text = 'apple';
    optionElement.value = 'apple';
    selectElement.appendChild(optionElement);
    fireEvent.change(selectElement, { target: { value: mockWord } });
    fireEvent.click(guessButton);
    const pinInputFields = screen.getAllByRole('textbox');
    const firstRow = pinInputFields.slice(0, 5);

    expect(firstRow.map((input) => (
      input as HTMLInputElement).value)).toEqual(['a', 'p', 'p', 'l', 'e']);

    const resetButton = screen.getByText('Reset Game');
    fireEvent.click(resetButton);

    pinInputFields.forEach((input) => {
      expect((input as HTMLInputElement).value).toEqual('');
    });
  });
});
