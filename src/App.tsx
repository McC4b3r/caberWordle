import {
  Box,
  Divider,
  Heading,
  Spinner,
  AbsoluteCenter,
  Center,
} from '@chakra-ui/react';
import { WordBoard } from './components/wordBoard';
import { Keyboard } from './components/keyboard';
import { AnswerSpecifier } from './components/answerSpecifier';
import { FinishedModal } from './components/finishedModal';
import { useKeyboardInput, useGameLogic } from './hooks';
import { ResetButton } from './components/resetButton';

const App = () => {
  const {
    gameState,
    updateGameState,
    wordList,
    availableWords,
    isLoading,
    updateKeyboardRef,
    generateButtonColors,
    resetGameAndCloseModal,
    handleGuessSubmit,
    handleInputChange,
    handleKeyPress,
    isOpen,
  } = useGameLogic();

  useKeyboardInput(handleKeyPress);

  if (isLoading) {
    return (
      <AbsoluteCenter data-testid="loading-spinner">
        <Spinner />
      </AbsoluteCenter>
    );
  }

  return (
    <Box>
      <Heading display="flex" justifyContent="center" my={4}>Sandbardle</Heading>
      <Divider orientation='horizontal' />
      <WordBoard
        gameState={gameState}
        handleInputChange={handleInputChange}
      />
      <AnswerSpecifier
        gameState={gameState}
        updateGameState={updateGameState}
        wordList={wordList}
        availableWords={availableWords}
        handleInputChange={handleInputChange}
        handleGuessSubmit={handleGuessSubmit}
      />
      <Keyboard
        gameState={gameState}
        updateGameState={updateGameState}
        updateKeyboardRef={updateKeyboardRef}
        handleInputChange={handleInputChange}
        handleGuessSubmit={handleGuessSubmit}
        generateButtonColors={generateButtonColors}
      />
      <Center mt={8}>
        <ResetButton resetGameAndCloseModal={resetGameAndCloseModal} />
      </Center>
      <FinishedModal
        gameState={gameState}
        isOpen={isOpen}
        resetGame={resetGameAndCloseModal}
      />
    </Box>
  );
};

export default App;
