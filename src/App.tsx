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
    setSelectedWord,
    currentRow,
    setCurrentRow,
    wordList,
    availableWords,
    targetWord,
    selectedWord,
    isLoading,
    validationResults,
    isWinner,
    updateKeyboardRef,
    updateButtonColors,
    resetGameAndCloseModal,
    handleGuessSubmit,
    handleInputChange,
    handleKeyPress,
    isOpen,
    isHardMode,
    setIsHardMode,
    containsAllValidLetters,
  } = useGameLogic()

  useKeyboardInput(handleKeyPress);
  // console.log(validationResults)

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
      <HardModeToggle isHardMode={isHardMode} setIsHardMode={setIsHardMode} />
      <WordBoard
        targetWordlength={targetWord.length}
        inputValues={inputValues}
        currentRow={currentRow}
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
        updateKeyboardRef={updateKeyboardRef}
        targetWordLength={targetWord.length}
        inputValues={inputValues}
        currentRow={currentRow}
        handleInputChange={handleInputChange}
        setCurrentRow={setCurrentRow}
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
