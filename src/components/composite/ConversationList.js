import { Flex, Spinner } from '@chakra-ui/react';
import { ChatList } from 'react-chat-elements';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NotFoundImage from '../../assets/not found.png';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../hooks/UserContext';

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

function ConversationList({ conversations, width }) {
  const navigate = useNavigate();
  const [user] = useContext(UserContext);
  const [conversationList, setConversationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function addUserInfo(user, conversations) {
    for (let conversation of conversations) {
      try {
        conversation.user = {};
        conversation.user.id = conversation.participants.find(
          c => c != user.id
        );

        let { data: data2 } = axios.get(
          `/userService/user?id=${conversation.user.id}`
        );
        conversation.user.name = data2;

        let { data } = await axios.get(
          `/photoService/images/${conversation.user.id}`,
          {
            responseType: 'blob',
          }
        );
        conversation.user.photo = await base64ToFile(data);
      } catch (e) {
        conversation.user.photo = NotFoundImage;
      }
    }
    setConversationList(conversations);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!user) return;
    if (!conversations || conversations.length === 0) return;
    addUserInfo(user, [...conversations]);
  }, [user, conversations]);

  if (isLoading) {
    return (
      <Flex
        direction={['column']}
        h={['80vh', '60vh']}
        bg="rgba(243, 243, 243, 0.8)"
        w={width}
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
    <Flex
      direction={['column']}
      h={['80vh', '60vh']}
      bg="rgba(243, 243, 243, 0.8)"
      w={width}
    >
      <ChatList
        className="chat-list"
        dataSource={conversationList.map(conversation => {
          const lastMessage = conversation.messages?.at(-1);
          return {
            avatar: conversation.user.photo,
            alt: conversation._id,
            title: conversation.user.name,
            subtitle: lastMessage?.content || 'Say hi!',
            date: new Date(lastMessage?.sentDate),
            unread:
              !lastMessage?.isRead && lastMessage?.senderId != user.id ? 1 : 0,
          };
        })}
        width={width}
        onClick={chat => navigate(`/chat/${chat.alt}`)}
      />
    </Flex>
  );
}

export default ConversationList;
