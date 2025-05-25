import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Text from './Text';
import theme from '../theme';

const ratingMessage = 'Rating must be between 0 and 100';

const validationSchema = Yup.object().shape({
  ownerName: Yup.string()
    .required('Repository owner\'s username is required'),
  repositoryName: Yup.string()
    .required('Repository name is required'),
  rating: Yup.number()
    .required('Rating is required')
    .min(0, ratingMessage)
    .max(100, ratingMessage),
  review: Yup.string()
    .optional(),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: '',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  input: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
    fontSize: theme.fontSizes.body,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
});

const CreateReviewForm = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Repository owner's GitHub username"
          onChangeText={handleChange('ownerName')}
          onBlur={handleBlur('ownerName')}
          value={values.ownerName}
        />
        {touched.ownerName && errors.ownerName && (
          <Text style={styles.errorText}>{errors.ownerName}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Repository name"
          onChangeText={handleChange('repositoryName')}
          onBlur={handleBlur('repositoryName')}
          value={values.repositoryName}
        />
        {touched.repositoryName && errors.repositoryName && (
          <Text style={styles.errorText}>{errors.repositoryName}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Rating between 0 and 100"
          keyboardType="numeric"
          onChangeText={handleChange('rating')}
          onBlur={handleBlur('rating')}
          value={values.rating}
        />
        {touched.rating && errors.rating && (
          <Text style={styles.errorText}>{errors.rating}</Text>
        )}

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Review"
          multiline
          onChangeText={handleChange('review')}
          onBlur={handleBlur('review')}
          value={values.review}
        />
        {touched.review && errors.review && (
          <Text style={styles.errorText}>{errors.review}</Text>
        )}

        <Pressable onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Create a review</Text>
        </Pressable>
      </View>
    )}
  </Formik>
);

export default CreateReviewForm;
