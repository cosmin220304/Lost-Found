import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../hooks/UserContext';
import axios from 'axios';
import { Image, Flex, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import NotFoundImage from '../../assets/not found.png';

function Profile() {
  const [user, setUser] = useContext(UserContext);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`photoService/images/${user.id}`, { responseType: 'blob' })
      .then(function (response) {
        const reader = new window.FileReader();
        reader.readAsDataURL(response.data);
        reader.onload = function () {
          setImage(reader.result);
        };
      });
  }, [user]);

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const deleteAccount = () => {
    axios.delete(`/userService/delete?id=${user.id}`).then(() => logout());
  };

  return (
    <Flex
      color="twitter.900"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Text m="4" fontSize="3xl" fontWeight="bold" fontStyle={'italic'}>
        Profile
      </Text>
      <Image
        w="10rem"
        src={image || NotFoundImage}
        alt="profile pic"
        rounded="full"
      />
      <Text mb="2">{user.name}</Text>
      <Text mb="2">{user.email}</Text>
      <Button w="20rem" colorScheme="twitter" m="2" onClick={logout}>
        Logout
      </Button>
      <Text>or</Text>
      <Button w="20rem" bg="red" color="white" m="2" onClick={deleteAccount}>
        Delete account
      </Button>
    </Flex>
  );
}

export default Profile;
