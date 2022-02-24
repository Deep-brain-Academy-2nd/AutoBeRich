// module.exports = {
// 	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
// 	setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
// 	transform: {
// 		'^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
// 	},
// 	// moduleNameMapper: {
// 	// 	'\\.(css|less|scss|sass)$': '<rootDir>/styles/__mocks__/styleMock.js',
// 	// },
// };

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/pages/$1',
		// '\\.svg': '<rootDir>/__mocks__/svgrMock.ts',
	},
	transform: {
		'.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|gif)$': 'jest-transform-stub',
	},
	setupFilesAfterEnv: ['<rootDir>/src/setUpTests.ts'],
	testPathIgnorePatterns: ['<rootDir>/node_modules/'],
};
