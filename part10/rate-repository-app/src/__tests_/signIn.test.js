import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../components/SignIn';
import React from 'react';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // 1. Create a mock function for onSubmit
      const onSubmit = jest.fn();

      // 2. Create a mock ref for passwordInputRef (though not strictly necessary for this test's assertions,
      //    it's good practice to provide all required props)
      const passwordInputRef = React.createRef();

      // 3. Render the SignInContainer component
      render(<SignInContainer onSubmit={onSubmit} passwordInputRef={passwordInputRef} />);

      // 4. Fill the text inputs
      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');

      // 5. Press the submit button
      //    Find the button by its testID.
      fireEvent.press(screen.getByTestId('signInButton'));

      await waitFor(() => {
        // 6. Expect the onSubmit function to have been called once
        expect(onSubmit).toHaveBeenCalledTimes(1);
        // 7. Expect the onSubmit function to have been called with the correct arguments
        expect(onSubmit.mock.calls[0][0]).toEqual({ username: 'kalle', password: 'password' });
      });
    });
  });
});