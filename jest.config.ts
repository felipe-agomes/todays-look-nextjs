import type { Config } from 'jest';

const config: Config = {
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/node_modules/', '/.next/'],
	// collectCoverage: true,
	// collectCoverageFrom: ['src/**/*.ts(x)'],
	// setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
};

export default config;
