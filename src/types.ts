export type GameState = {
  inputValues: string[];
  validationResults: ValidationResult[][];
  currentRow: number;
  targetWord: string;
  selectedWord: string;
  isWinner: boolean | null;
};

type UpdateGameState = (state: Partial<GameState> | ((prevState: GameState) => Partial<GameState>)) => void;

export type BoardProps = {
  gameState: GameState;
  handleInputChange: (value: string) => void;
}

export type RowProps = {
  gameState: GameState;
  rowIndex: number;
  handleInputChange: (word: string) => void;
};

export type KeyboardProps = {
  gameState: GameState;
  updateGameState: UpdateGameState;
  updateKeyboardRef: (keyboard: any) => void;
  handleInputChange: (value: string) => void;
  handleGuessSubmit: (guess: string) => void;
  generateButtonColors: (keyboard: any, validationResults: ValidationResult[][]) => void;
};

export type ValidationResult = {
  letter: string;
  status: 'correct' | 'present' | 'wrong';
};

export type AnswerSpecifierProps = {
  gameState: GameState;
  updateGameState: UpdateGameState;
  wordList: string[];
  handleInputChange: (word: string) => void;
  handleGuessSubmit: (guess: string) => void;
  availableWords: string[];
}

export type FinishedmodalProps = {
  gameState: GameState;
  isOpen: boolean;
  resetGame: () => void;
}

export type ResetButtonProps = {
  resetGameAndCloseModal: () => void;
}