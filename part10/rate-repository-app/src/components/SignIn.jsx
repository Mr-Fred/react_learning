import React, { useRef } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

// Initial values
const initialValues = {
  username: '',
  password: '',
};

// Yup validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
});

// Main component
const SignIn = () => {
  // Create refs for the inputs
  const passwordInputRef = useRef(null);
  const [signIn] = useSignIn();

  const onSubmit = (values) => {
    const { username, password } = values;
    signIn({ username, password })
      .catch((error) => {
        // Handle sign-in error
        console.error('Sign-in error:', error);
      });
  };

  return (

      <View style={styles.pageContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <> 
              <Text style={styles.title}>
                Sign In
              </Text>
              {/* Username Input */}
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                returnKeyType="next" // shows 'next' button
                onSubmitEditing={() => passwordInputRef.current.focus()} // when pressing Next
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              {/* Password Input */}
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                ref={passwordInputRef} // connected ref
                returnKeyType="done" // shows 'done' button
                onSubmitEditing={handleSubmit} // submit form on done
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              {/* Sign In Button */}
              <Pressable
                onPress={handleSubmit}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  Sign In
                </Text>
              </Pressable>
            </>
          )}
        </Formik>
      </View>
  );
};

// Styles
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: theme.fontSizes.body,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    // color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
});

export default SignIn;
