import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import SignUpForm from './SignUpForm';
import { CREATE_USER } from '../graphQl/mutations';
import useSignIn from '../hooks/useSignIn';
import Text from './Text';

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async (values, { setSubmitting }) => {
    const { username, password } = values;
    setLoading(true);
    setSubmitError(null);
    try {
      await createUser({ variables: { user: { username, password } } });
      await signIn({ username, password });
      navigate('/'); // Redirect after successful sign up and sign in
    } catch (e) {
      setSubmitError(e.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <View>
      <SignUpForm onSubmit={onSubmit} loading={loading} />
      {loading && (
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {submitError && (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
          {submitError}
        </Text>
      )}
    </View>
  );
};

export default SignUp;
