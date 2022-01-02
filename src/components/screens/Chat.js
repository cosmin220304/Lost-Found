import { Box, Flex, Text, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ChatList } from 'react-chat-elements';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ConversationList from '../composite/ConversationList';
import ChatWithUser from '../composite/ChatWithUser';

function Chat() {
  const { conversationId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const userId = 123;

  useEffect(() => {
    (async () => {
      while (1) {
        const { data } = await axios.get(
          `/chatService/conversations/user/${userId}`
        );
        setConversations(data);
        setIsLoading(false);
        await new Promise(resolve => setTimeout(resolve, 100000));
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <Box>
        <Text m="4" fontSize="3xl" fontWeight="bold" fontStyle={'italic'}>
          Active Chats
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

  if (!conversations || conversations.length === 0) {
    return (
      <Box textAlign={'center'}>
        <Text m="4" fontSize="3xl" fontWeight="bold" fontStyle={'italic'}>
          Active Chats
        </Text>
        <Text> No active conversations</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Text m="4" fontSize="3xl" fontWeight="bold" fontStyle={'italic'}>
        Active Chats
      </Text>

      {/* Desktop */}
      <Flex display={['none', 'flex']} pr="4vw" pl="4vw" gap="2vw">
        <ConversationList conversations={conversations} width="22vw" />
        <ChatWithUser conversationId={conversationId} width="70vw" />
      </Flex>

      {/* Mobile */}
      <Flex
        display={['flex', 'none']}
        alignItem="flex-start"
        justifyContent="center"
      >
        {conversationId ? (
          <ChatWithUser conversationId={conversationId} width="100vw" />
        ) : (
          <ConversationList conversations={conversations} width="100vw" />
        )}
      </Flex>
    </Box>
  );
}

export default Chat;
