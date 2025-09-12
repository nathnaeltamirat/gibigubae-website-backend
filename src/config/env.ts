import { config } from 'dotenv';

config({});

const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
};
export const DATABASE_URL:string = getEnvVar('DATABASE_URL')
export const NODE_ENV:string = getEnvVar('NODE_ENV')
export const PORT: number = parseInt(getEnvVar('PORT'), 10);
export const JWT_SECRET:string = getEnvVar('JWT_SECRET');
export const JWT_EXPIRES_IN:string = getEnvVar('JWT_EXPIRES_IN');
export const DB_USERNAME: string = getEnvVar('DB_USERNAME');
export const DB_PASSWORD: string = getEnvVar('DB_PASSWORD');
export const API_KEY: string = getEnvVar('API_KEY');
export const API_SECRET: string = getEnvVar('API_SECRET');
export const CLOUD_NAME: string = getEnvVar('CLOUD_NAME');
export const DB_NAME: string = getEnvVar('DB_NAME');
export const DB_HOST: string = getEnvVar('DB_HOST');
export const DB_PORT: number = parseInt(getEnvVar('DB_PORT'), 10);
export const DB_SSL: boolean = getEnvVar('DB_SSL') === 'true';
