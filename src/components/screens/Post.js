import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Post() {
  const navigate = useNavigate();

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
        w="20rem"
        color="white"
        variant="outline"
        mb="12"
      >
        I lost an object
      </Button>
      <Button
        bg={'twitter.900'}
        h="16"
        w="20rem"
        color="white"
        variant="outline"
        onClick={() => navigate(`/post/new`)}
      >
        I found an object
      </Button>
    </Flex>
  );
}

export default Post;
