import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Flex,
} from '@chakra-ui/react';
import React from 'react';

function Login() {
  return (
    <Flex
      direction={'column'}
      alignItems={'center'}
      justifyItems={'center'}
      placeItems={'center'}
    >
      <Box p="4"> You are not logged in!</Box>
      <Box p="4"> Please fill the data below</Box>
      <FormControl w="50%">
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input id="email" type="email" />
      </FormControl>
    </Flex>
  );
}

export default Login;
