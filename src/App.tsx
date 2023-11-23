import React from 'react';
import { Box, Divider, Heading } from '@chakra-ui/react';
import { TextGrid } from './components/textGrid';

const App = () => {
  return (
    <Box>
      <Heading display="flex" justifyContent="center" my={4}>
        Sandbardle
      </Heading>
      <Divider orientation='horizontal' />
      <TextGrid length={5} />
    </Box>
  );
}

export default App;
