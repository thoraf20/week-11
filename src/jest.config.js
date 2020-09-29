module.exports = {
  roots: ["<rootDir>/build"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|ts)",
    "**/?(*.)+(spec|test).+(ts|tsx|ts)",
  ],
  transform: {
    "^.+\\.(ts|tsx|ts)$": "ts-jest",
  },
  testEnvironment: "node",
  globalSetup: './setupTests.js',
  globalTeardown: './teardownTests.js',
 
};
