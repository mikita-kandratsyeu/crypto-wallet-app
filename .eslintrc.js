module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-native', '@typescript-eslint', 'prettier'],
  rules: {
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-debugger': 'off',
    'react/jsx-props-no-spreading': 0,
    'import/no-unresolved': 0,
    'react/prop-types': 0,
    'react/no-unused-prop-types': 0,
    'import/extensions': 0,
    'react-hooks/exhaustive-deps': 0,
    'no-console': 0,
    'import/prefer-default-export': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: true,
        classes: true,
        variables: false,
      },
    ],
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
  },
};
