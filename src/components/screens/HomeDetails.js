import Post from '../composite/Post';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../hooks/UserContext';
import { Spinner, Text, Flex, Input, Button } from '@chakra-ui/react';
import axios from 'axios';

function HomeDetails() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/postService/api/posts/get`, {})
      .then(({ data }) => setPost(data.find(d => d.details.id == postId)))
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

  const sendMessageToUser = async () => {
    setIsLoading(true);
    alert(JSON.stringify(post));
    alert(post.userId);
    await axios.get(
      `/chatService/conversations/user/${user.id}/receiver/${post.userId}`
    );
    setIsLoading(false);
    navigate('/chat');
  };

  const deletePost = async () => {
    axios
      .delete(`/postService/api/posts/delete?id=${post.id}`, {})
      .then(() => navigate('/'));
  };

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Flex direction={'column'} alignItems={'center'} justifyContent={'center'}>
      <Text m="4" fontSize="3xl" fontWeight="bold" fontStyle={'italic'}>
        Object info:
      </Text>
      <Post post={post} />
      <Button
        colorScheme={'twitter'}
        m="4"
        w="20rem"
        onClick={sendMessageToUser}
      >
        Send message
      </Button>
      {post.userId === user.id && (
        <Button bg="red" color="white" w="20rem" onClick={deletePost}>
          Delete post
        </Button>
      )}
    </Flex>
  );
}

export default HomeDetails;
