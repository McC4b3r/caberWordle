import { Box, Divider, Heading } from '@chakra-ui/react';
import { WordBoard } from './components/textGrid';
import { Keyboard } from './components/keyboard';

const App = () => {
  return (
    <Box>
      <Heading display="flex" justifyContent="center" my={4}>
        Sandbardle
      </Heading>
      <Divider orientation='horizontal' />
      <WordBoard length={5} />
      <Keyboard />
    </Box>
  );
}

export default App;
