module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@web3-solid/(.*)$': '<rootDir>/packages/$1/src',
  },
}
