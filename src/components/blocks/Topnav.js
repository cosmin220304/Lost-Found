import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Icon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faHome,
  faPlusCircle,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { UserContext } from '../../hooks/UserContext';

function IconLink({ to, name, icon }) {
  return (
    <Link to={to}>
      <Flex
        direction={['column', 'row']}
        alignItems={'center'}
        justifyItems={'center'}
        mr={['0', '7']}
      >
        <Icon mr={['0', '1']} color={['white']}>
          <FontAwesomeIcon icon={icon} />
        </Icon>
        <Text color={['white']}>{name}</Text>
      </Flex>
    </Link>
  );
}

function Topnav() {
  const [user] = useContext(UserContext);

  return (
    <Flex
      align="center"
      justify={['space-around', 'flex-end']}
      h={['20', '10']}
      p={['2', '4']}
      bg={'twitter.400'}
      display={[user ? 'flex' : 'none', 'flex']}
    >
      <Box flex="1" display={['none', 'none', 'block']}>
        <Text color={['white']} align="start">
          <FontAwesomeIcon icon={faSearch} /> <Link to="/"> Lost & Found</Link>
        </Text>
      </Box>
      {user && (
        <>
          <IconLink to="/" name="Home" icon={faHome} />
          <IconLink to="/post" name="Post" icon={faPlusCircle} />
          <IconLink to="/chat" name="Chat" icon={faComment} />
          <IconLink to="/profile" name="Profile" icon={faUser} />
        </>
      )}
    </Flex>
  );
}

export default Topnav;
