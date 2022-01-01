import React from 'react';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import Topnav from '../components/blocks/Topnav';
import Routes from '../routes/routes';
import './App.css';
import 'react-chat-elements/dist/main.css';

function App() {
  return (
    <ChakraProvider>
      <Flex
        direction={['column-reverse', 'column']}
        textAlign="center"
        fontSize={['xl', 'normal']}
        backgroundColor={'twitter.50'}
        height="100vh"
      >
        <Topnav />
        <Box flex="1">
          <Routes />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
