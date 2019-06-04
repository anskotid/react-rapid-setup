module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],
  resolver: 'jest-pnp-resolver',
  setupFiles: [
    'react-app-polyfill/jsdom',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx}',
  ],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(cc-common|cc-react-reusables|cc-js-utils|slick-carousel/slick|cc-semantic-ui-css|flag-icon-css)/)',
    // '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$',
    // '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    // '\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  moduleFileExtensions: [
    'web.js',
    'js',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
};
