import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-native";
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  submitContainer: {
    margin: 10
  },
  errorText: {
    fontSize: 15,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.error,
    textAlign: 'center',
    padding: 5
  },
});
const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository Owner is required'),
  repositoryName: yup
    .string()
    .required('Repository Name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number between 0 and 100')
    .min(0, 'Rating must be greater or equal to 0')
    .max(100, 'Rating must be less than or equal to 100')
    .required('Rating is required')
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <FormikTextInput name="ownerName" placeholder="Repository Owner" />
      <FormikTextInput name="repositoryName" placeholder="Repository Name" />
      <FormikTextInput name="rating" placeholder="Rating" />
      <FormikTextInput name="text" placeholder="Review" multiline/>
      <View style={styles.submitContainer}>
        <Button
          title="Create review"
          onPress={onSubmit}
          color={theme.colors.primary}
        />
      </View>
    </View>
  );
};

export const CreateReviewContainer = ({ onSubmit }) => {
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
  };

  return (
    <Formik initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

let previousTimeOutId = null;

const CreateReview = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [createReview] = useReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;
    try {
      const result = await createReview({ repositoryName, ownerName, rating: Number(rating), text });
      const repositoryID = result.data.createReview.repositoryId;
      history.push(`/repositories/${repositoryID}`);
    } catch (e) {
      showErrorMessage(e.message);
      console.log(e);
    }
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    clearTimeout(previousTimeOutId);
    previousTimeOutId = setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  return (
    <View>
      {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
      <CreateReviewContainer onSubmit={onSubmit} />
    </View>
  );
};

export default CreateReview;