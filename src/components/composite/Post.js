import React, { useState, useEffect } from 'react';
import { Spinner, Image, Flex, Text, Box } from '@chakra-ui/react';
import axios from 'axios';
import NotFoundImage from '../../assets/not found.png';

function Post({ post }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [postImage, setPostImage] = useState(null);

  const refreshData = async post => {
    while (1) {
      axios.get(`userService/user?id=${24 || post.userId}`).then(({ data }) => {
        setUser(data);
      });
      axios
        .get(`photoService/images/${24 || post.userId}`, {
          responseType: 'blob',
        })
        .then(({ data }) => {
          var reader = new window.FileReader();
          reader.readAsDataURL(data);
          reader.onload = function () {
            setUserImage(reader.result);
          };
        })
        .catch(() => {
          setUserImage(NotFoundImage);
        });
      axios
        .get(`photoService/images/${post.id}`, { responseType: 'blob' })
        .then(({ data }) => {
          var reader = new window.FileReader();
          reader.readAsDataURL(data);
          reader.onload = function () {
            setPostImage(reader.result);
          };
        })
        .catch(() => {
          setPostImage(NotFoundImage);
        });
      await new Promise(resolve => setTimeout(resolve, 100000));
    }
  };

  useEffect(() => {
    refreshData(post);
  }, [post]);

  useEffect(() => {
    if (user && userImage && postImage) {
      setIsLoading(false);
    }
  }, [user, userImage, postImage]);

  if (isLoading) {
    return (
      <Box boxShadow="md" p="4" bg="white" w="20rem">
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
    <Box cursor={'pointer'} boxShadow="md" p="4" bg="white" w="20rem">
      <Flex alignItems={'center'}>
        <Image
          w="3rem"
          src={userImage || NotFoundImage}
          alt="profile pic"
          rounded="full"
        />
        <Text ml="2" bold>
          {user?.name}
        </Text>
        <Box flex={1} />
        <Box
          p={'2'}
          fontSize={'small'}
          borderRadius={'15px'}
          color="white"
          bg="twitter.700"
        >
          {post.details.category}
        </Box>
      </Flex>
      <Flex alignItems={'center'}>
        <Text textAlign={'left'} fontSize={'small'} mb="2">
          {post.details.createdDate}
        </Text>
        <Box flex={1} />
        <Box
          borderRadius={'50%'}
          w="4"
          h="4"
          bg={post.status === 'PENDING_LOST' ? 'yellow' : 'green'}
        />
        <Text ml="2" fontSize={'small'}>
          {post.status === 'PENDING_LOST' ? 'Pending' : 'Found'}
        </Text>
      </Flex>
      <Flex justifyContent={'center'}>
        <Image
          w="10rem"
          src={postImage || NotFoundImage}
          alt="post pic"
          rounded="full"
        />
      </Flex>
      <Text mt="2" fontSize="3xl" fontWeight="bold" fontStyle={'italic'}>
        {post.details.title}
      </Text>
      <Text mb="2">{post.details.description}</Text>
    </Box>
  );
}

export default Post;
