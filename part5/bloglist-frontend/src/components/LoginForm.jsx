import React from 'react';
import { useField } from '../reducers/inputField';
import { useLogin } from '../features/useUser';

const LoginForm = () => {
  const username = useField('text', 'username');
  const password = useField('password', 'password');
  const { mutate: login } = useLogin();

  const handleLogin = async (event) => {
    event.preventDefault();

    login({
      username: username.value,
      password: password.value,
    });
    username.reset();
    password.reset();
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username:
          </label>
          <input
            id="username"
            type="text"
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            {...username.inputProps}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            {...password.inputProps}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;