import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Flex,
  Button,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';

function Login() {
  function validate(value) {
    let error;
    if (!value) {
      error = 'Cannot be empty!';
    }
    return error;
  }

  return (
    <Flex
      direction={'column'}
      alignItems={'center'}
      justifyItems={'center'}
      placeItems={'center'}
    >
      <Box p="4"> You are not logged in!</Box>
      <Box p="4"> Please fill the data below</Box>
      {/* <FormControl w="50%">
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input id="email" type="email" bg={'white'} />
      </FormControl> */}

      <Formik
        initialValues={{ email: 'Sasuke' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {props => (
          <Form>
            <Field name="email" validate={validate}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...field} id="email" placeholder="email" bg="white" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <br />
            <Field name="password" validate={validate}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormHelperText fontSize={'small'} textAlign={'start'}>
                    Make sure its correct!
                  </FormHelperText>
                  <Input
                    {...field}
                    id="password"
                    type={'password'}
                    placeholder="password"
                    bg="white"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="twitter"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}

export default Login;
