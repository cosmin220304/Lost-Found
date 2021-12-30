import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
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
  return (
    <Flex
      align="center"
      justify={['space-around', 'flex-end']}
      h={['20', '10']}
      p="4"
      bg={'twitter.400'}
    >
      <Box flex="1" display={['none', 'none', 'block']}>
        <Text color={['white']} align="start">
          <FontAwesomeIcon icon={faSearch} /> <Link to="/"> Lost & Found</Link>
        </Text>
      </Box>
      <IconLink to="/post" name="Post" icon={faPlusCircle} />
      <IconLink to="/" name="Home" icon={faHome} />
      <IconLink to="/chat" name="Chat" icon={faComment} />
      <IconLink to="/profile" name="Profile" icon={faUser} />
    </Flex>
  );
}

export default Topnav;
