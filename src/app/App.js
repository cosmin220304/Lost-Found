import React from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import Topnav from '../components/blocks/Topnav';
import Routes from '../routes/routes';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <Flex
        direction={'column'}
        textAlign="center"
        fontSize={['xl', 'normal']}
        backgroundColor={'twitter.50'}
        height="100vh"
      >
        <Topnav />
        <Routes />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
