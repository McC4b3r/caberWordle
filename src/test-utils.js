import { render } from '@testing-library/react';
import { ChakraProvider, theme } from '@chakra-ui/react';

const AllProviders = ({ children }) => (
  <ChakraProvider resetCSS theme={theme}>
    {children}
  </ChakraProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender };