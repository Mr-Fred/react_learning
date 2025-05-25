import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Text from './Text';
import theme from '../theme';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
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

const SignUpForm = ({ onSubmit, loading }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={handleChange('username')}
          onBlur={handleBlur('username')}
          value={values.username}
        />
        {touched.username && errors.username && (
          <Text style={styles.errorText}>{errors.username}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
        />
        {touched.password && errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Password confirmation"
          secureTextEntry
          onChangeText={handleChange('passwordConfirmation')}
          onBlur={handleBlur('passwordConfirmation')}
          value={values.passwordConfirmation}
        />
        {touched.passwordConfirmation && errors.passwordConfirmation && (
          <Text style={styles.errorText}>{errors.passwordConfirmation}</Text>
        )}

        <Pressable
          onPress={handleSubmit}
          style={[styles.button, loading && { opacity: 0.5 }]}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Signing up...' : 'Sign up'}
          </Text>
        </Pressable>
      </View>
    )}
  </Formik>
);

export default SignUpForm;
