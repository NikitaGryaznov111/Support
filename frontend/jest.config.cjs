const config = {
  testEnvironment: 'jsdom',
  //  Используем ts-jest для .ts, .tsx
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest', // только для JS
    '^.+\\.(ts|tsx)$': 'ts-jest', // для TS — ts-jest
  },
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy', // для модульных стилей
    '\\.(png|jpg|jpeg|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // для изображений
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  clearMocks: true,
  resetMocks: true,
};
module.exports = config;
// transform использует babel-jest
// extensionsToTreatAsEsm — помогает Jest понимать, что файлы нужно обрабатывать как ESM
// moduleNameMapper — исправляет проблему с импортами без .js
// Jest ещё не поддерживает нативно ESM-конфиги, даже при "type": "module". ПОЭТОМУ module.exports
