import Post from '../composite/Post';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../hooks/UserContext';
import { Spinner, Button, Flex, Input } from '@chakra-ui/react';
import axios from 'axios';

function HomeDetails() {
  const [user, setUser] = useContext(UserContext);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`postService/api/posts/details/get?id=${postId}`, {})
      .then(({ data }) => setPost(data))
      .finally(() => setIsLoading(false));
  }, [postId]);

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  return (
    <div>
      <Post post={post} />
    </div>
  );
}

export default HomeDetails;
