module.exports = [
  // Configurações base
  {
    root: true,
    extends: [
      '@react-native',
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:react-hooks/recommended',
    ],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        browser: true,
        node: true,
      },
    },
    plugins: [
      'react',
      '@typescript-eslint',
      'import',
      'prettier',
      'react-hooks',
    ],
    rules: {
      // Regras gerais
      'no-console': 'off',
      indent: ['error', 2],
      'no-empty-function': 'error',
      'no-const-assign': 'error',
      'no-useless-escape': 'off',
      'prefer-const': 'off',

      // Regras do TypeScript
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all', // Verifica todas as variáveis
          args: 'after-used', // Verifica argumentos de função
          ignoreRestSiblings: true, // Ignora destructuring com rest
          varsIgnorePattern: '^_', // Ignora variáveis começando com '_'
          caughtErrors: 'all', // Verifica erros capturados
        },
      ],

      // Desativar regras padrão que podem interferir
      'no-unused-vars': 'off', // Deixa apenas @typescript-eslint/no-unused-vars ativa

      // Regras do React
      'react/self-closing-comp': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unknown-property': 'error',

      // Regras de import
      'import/no-unresolved': 'off',
      'import/no-named-as-default': 'off',

      // Regras de hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Regras de aspas
      quotes: ['error', 'single'],

      // Regras do Prettier
      'prettier/prettier': [
        'error',
        {
          tabWidth: 2,
          singleQuote: true,
          trailingComma: 'all',
          arrowParens: 'always',
          endOfLine: 'auto',
        },
      ],
    },
    ignorePatterns: ['node_modules'],
  },
];
