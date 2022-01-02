import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Image, Flex, Text, Box, Spinner } from '@chakra-ui/react';
import Post from '../composite/Post';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      while (1) {
        const { data } = await axios.get(`postService/api/posts/get`, {});
        setPosts(data);
        setIsLoading(false);
        await new Promise(resolve => setTimeout(resolve, 100000));
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <Box>
        <Text m="4" fontSize="3xl" fontWeight="bold" fontStyle={'italic'}>
          Home
        </Text>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }

  return (
    <Flex
      color="twitter.900"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Text m="4" fontSize="3xl" fontWeight="bold" fontStyle={'italic'}>
        Home
      </Text>

      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap="4"
        h={['80vh', '100%']}
        overflowY={['scroll', 'initial']}
      >
        {posts.map(post => (
          <Post key={`post$-${post.id}`} post={post} />
        ))}
      </Flex>
    </Flex>
  );
}

export default Home;
