module.exports = {
    roots: ["<rootDir>/build"],
    testMatch: [
        "**/__tests__/**/*.+(js|jsx|js)",
        "**/?(*.)+(spec|test).+(js|jsx|js)",
    ],
    transform: {
        "^.+\\.(js|jsx|js)$": "js-jest",
    },
    testEnvironment: "node",
};
