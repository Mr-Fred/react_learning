module.exports = {
  extends: ['airbnb-base'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-console': 'off',
    'react-refresh/only-export-components': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'consistent-return': 'off',
    'no-else-return': ['error'],
    'global-require': 'off',
  },
};
