/* eslint-disable */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
    jquery: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['react', 'react-hooks'],
  settings: { react: { version: 'detect' } },
  extends: [
    '@beaverbuilder/eslint-config',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  globals: {
    wp: 'readonly',
    jQuery: 'readonly',
    __: 'readonly',
    sprintf: 'readonly',

    __webpack_public_path__: 'writable',
    __PRODUCTION__: 'readonly',

    FL: 'readonly',
    FLBuilder: 'readonly',
    FL_ASSISTANT_CONFIG: 'readonly',
    FL_ASSISTANT_INITIAL_STATE: 'readonly',

    describe: 'readonly',
    it: 'readonly',
    expect: 'readonly',
  },
  rules: {
    'linebreak-style': 'off',
    semi: 'off',
    'array-bracket-spacing': 'off',
    'space-unary-ops': 'off',
    'space-before-function-paren': 'off',
    quotes: ['warn', 'single', { avoidEscape: true }],
    'no-trailing-spaces': ['warn', { ignoreComments: true }],
    'no-undef': 'error',
    'no-case-declarations': 'error',
    'eol-last': ['warn', 'always'],
    yoda: 'off',
    'no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-key': 'error',
    'react/no-unknown-property': ['warn', { ignore: ['maskunits', 'maskcontentunits'] }],
    'no-prototype-builtins': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.*', '**/__tests__/**'],
      env: { jest: true },
      globals: { jQuery: 'readonly', wp: 'readonly' },
    },
  ],
};

