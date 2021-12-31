import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

function Post() {
  return (
    <Flex
      direction={['column']}
      textAlign="center"
      backgroundColor={'twitter.50'}
      justifyContent={'center'}
      alignItems={'center'}
      h="100%"
    >
      <Button
        bg={'twitter.900'}
        h="16"
        w="90%"
        color="white"
        variant="outline"
        mb="12"
      >
        I lost an object
      </Button>
      <Button bg={'twitter.900'} h="16" w="90%" color="white" variant="outline">
        I found an object
      </Button>
    </Flex>
  );
}

export default Post;
