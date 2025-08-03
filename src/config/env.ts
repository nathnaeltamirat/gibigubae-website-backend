import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
};


export const PORT: number = parseInt(getEnvVar('PORT'), 10);
export const DB_USERNAME: string = getEnvVar('DB_USERNAME');
export const DB_PASSWORD: string = getEnvVar('DB_PASSWORD');
export const DB_NAME: string = getEnvVar('DB_NAME');
export const DB_HOST: string = getEnvVar('DB_HOST');
export const DB_PORT: number = parseInt(getEnvVar('DB_PORT'), 10);
export const DB_SSL: boolean = getEnvVar('DB_SSL') === 'true';
