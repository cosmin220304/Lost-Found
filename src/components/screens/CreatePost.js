import React, { useContext, useState } from 'react';
import { UserContext } from '../../hooks/UserContext';
import {
  Button,
  Image,
  Flex,
  Text,
  Box,
  Spinner,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';

function CreatePost() {
  const [user] = useContext(UserContext);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  function validate(value) {
    let error;
    if (!value || value === '') {
      error = 'Cannot be empty!';
    }
    return error;
  }

  async function onSubmit(values, actions) {
    try {
      const { data } = await axios.post(`/postService/api/posts/create`, {
        userId: user.id,
        status: 'PENDING_LOST',
        hasForm: false,
      });
      const { data: data2 } = await axios.post(
        `/postService/api/posts/details/create`,
        {
          title: values.title,
          category: values.category,
          postId: data.id,
          description: values.description,
        }
      );
      if (images && images.length > 0) {
        await axios.put(`/photoService/images/${data.id}`, {
          base64: images[0].data_url,
        });
      }
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error.response.status === 413) {
        alert('Image too large!');
      } else {
        alert('Something went wrong!');
      }
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <Flex
      color="twitter.900"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Text m="4" fontSize="3xl" fontWeight="bold" fontStyle={'italic'}>
        Add found item
      </Text>

      <Flex
        justifyContent={'center'}
        alignItems={'stretch'}
        alignContent={'stretch'}
        flexWrap={'wrap'}
        gap="4"
        h={['80vh', '100%']}
        overflowY={['scroll', 'initial']}
      >
        <Formik
          initialValues={{ description: '', title: '', category: '' }}
          onSubmit={onSubmit}
        >
          {props => (
            <Form>
              <Field name="title" validate={validate}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.title && form.touched.title}
                    pb="4"
                  >
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input
                      {...field}
                      id="title"
                      placeholder="Title"
                      bg="white"
                    />
                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="description" validate={validate}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.description && form.touched.description
                    }
                    pb="4"
                  >
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Input
                      {...field}
                      id="description"
                      placeholder="Description"
                      bg="white"
                    />
                    <FormErrorMessage>
                      {form.errors.description}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="category" validate={validate}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.category && form.touched.category}
                    pb="4"
                  >
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <Select bg="white" {...field} placeholder="Select option">
                      <option value="LAPTOP">LAPTOP</option>
                      <option value="PHONE">PHONE</option>
                      <option value="WALLET">WALLET</option>
                    </Select>
                    <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <FormLabel htmlFor="img">Add an image</FormLabel>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <Box>
                    {imageList.map((image, index) => (
                      <img
                        key={index}
                        onClick={() => onImageUpdate(index)}
                        src={image['data_url']}
                        alt=""
                        width="100"
                      />
                    ))}
                    <Button
                      width={'100%'}
                      bg={isDragging ? 'twitter.900' : 'twitter.400'}
                      color={isDragging ? 'red' : 'twitter.900'}
                      onClick={() =>
                        imageList.length > 0
                          ? onImageUpdate(0)
                          : onImageUpload()
                      }
                      {...dragProps}
                    >
                      Click or Drop here image
                    </Button>
                  </Box>
                )}
              </ImageUploading>
              <Button
                mt={4}
                colorScheme="twitter"
                isLoading={props.isSubmitting}
                type="submit"
                width="100%"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
}

export default CreatePost;
