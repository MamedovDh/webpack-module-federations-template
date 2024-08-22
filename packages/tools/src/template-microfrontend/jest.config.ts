import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    automock : true,
		clearMocks : true
  };
};