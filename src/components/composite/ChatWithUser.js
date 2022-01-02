import { Spinner, Button, Flex, Input } from '@chakra-ui/react';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../hooks/UserContext';
import { ChatList } from 'react-chat-elements';
import axios from 'axios';
import NotFoundImage from '../../assets/not found.png';

function base64ToFile(base64) {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.readAsDataURL(base64);
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

function ChatWithUser({ conversationId, width }) {
  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const refreshConversation = conversationId => {
    axios
      .get(`/chatService/conversations/${conversationId}`)
      .then(({ data }) => setConversation(data));
  };
  useEffect(() => {
    refreshConversation(conversationId);
  }, [conversationId]);

  const refreshMessages = async conversationId => {
    const { data } = await axios.get(
      `/chatService/conversations/${conversationId}/messages`
    );
    for (let message of data) {
      try {
        let { data: data2 } = axios.get(
          `userService/user?id=${message.senderId}`
        );
        message.senderName = data2;

        let { data } = await axios.get(
          `photoService/images/${message.senderId}`,
          {
            responseType: 'blob',
          }
        );
        message.photo = await base64ToFile(data);
      } catch (e) {
        message.photo = NotFoundImage;
      }
    }
    setMessages(data);
    setIsLoading(false);
  };
  useEffect(() => {
    refreshMessages(conversationId);
  }, [conversationId]);

  const handleSendMessage = () => {
    axios
      .post(`/chatService/conversations/${conversationId}/messages`, {
        senderId: user.id,
        receiverId: conversation.participants.find(p => p != user.id),
        content: newMessage,
      })
      .then(() => {
        setNewMessage('');
        refreshConversation(conversationId);
        refreshMessages(conversationId);
      });
  };

  if (!conversationId) {
    return <div></div>;
  }

  if (isLoading) {
    return (
      <Flex
        direction={'column'}
        w={width}
        height={['100vh', '50vh']}
        bg="rgba(243, 243, 243, 0.8)"
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <div>
      <Flex
        direction={'column'}
        w={width}
        height={['83vh', '50vh']}
        bg="rgba(243, 243, 243, 0.8)"
      >
        {messages.length > 0 ? (
          <ChatList
            className="chat-list"
            dataSource={messages.map(message => ({
              avatar: message.photo,
              alt: message.senderId,
              title: message.senderName,
              subtitle: message.content || 'Say hi!',
              date: new Date(message.sentDate),
              unread: !message?.isRead && message?.senderId != user.id ? 1 : 0,
            }))}
          />
        ) : (
          <div>Say hi!</div>
        )}
      </Flex>
      <Flex>
        <Input
          bg="white"
          value={newMessage || ''}
          onChange={e => setNewMessage(e.target.value)}
        />
        <Button bg="twitter.900" color="white" onClick={handleSendMessage}>
          Send
        </Button>
      </Flex>
    </div>
  );
}

export default ChatWithUser;
