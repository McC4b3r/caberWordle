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
import { HardModeToggle } from './components/hardModeToggle';

const App = () => {
  const {
    inputValues,
    currentRow,
    setCurrentRow,
    wordList,
    availableWords,
    targetWord,
    selectedWord,
    setSelectedWord,
    validationResults,
    isLoading,
    isWinner,
    isOpen,
    isHardMode,
    setIsHardMode,
    updateKeyboardRef,
    updateButtonColors,
    resetGameAndCloseModal,
    handleGuessSubmit,
    handleInputChange,
    handleKeyPress,
    containsAllValidLetters,
  } = useGameLogic()

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
      <HardModeToggle
        isHardMode={isHardMode}
        setIsHardMode={setIsHardMode}
        resetGameAndCloseModal={resetGameAndCloseModal}
      />
      <WordBoard
        inputValues={inputValues}
        targetWordlength={targetWord.length}
        handleInputChange={handleInputChange}
        validationResults={validationResults}
      />
      <AnswerSpecifier
        wordList={wordList}
        availableWords={availableWords}
        selectedWord={selectedWord}
        setSelectedWord={setSelectedWord}
        setCurrentRow={setCurrentRow}
        handleInputChange={handleInputChange}
        handleGuessSubmit={handleGuessSubmit}
        isHardMode={isHardMode}
        containsAllValidLetters={containsAllValidLetters}
      />
      <Keyboard
        inputValues={inputValues}
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
        updateKeyboardRef={updateKeyboardRef}
        targetWordLength={targetWord.length}
        handleInputChange={handleInputChange}
        handleGuessSubmit={handleGuessSubmit}
        updateButtonColors={updateButtonColors}
        validationResults={validationResults}
        isHardMode={isHardMode}
        containsAllValidLetters={containsAllValidLetters}
      />
      <Center mt={8}>
        <ResetButton resetGameAndCloseModal={resetGameAndCloseModal} />
      </Center>
      <FinishedModal
        isOpen={isOpen}
        isWinner={isWinner}
        targetWord={targetWord}
        resetGame={resetGameAndCloseModal}
      />
    </Box>
  );
};

export default App;
