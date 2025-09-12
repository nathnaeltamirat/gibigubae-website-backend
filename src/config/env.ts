import { config } from 'dotenv';

// Load .env only in development
if (process.env.NODE_ENV !== 'production') {
  config();
}

const getEnvVar = (name: string, required = true): string | undefined => {
  const value = process.env[name];
  if (!value && required) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
};

// General
export const NODE_ENV: string = getEnvVar('NODE_ENV') as string;
export const PORT: number = parseInt(getEnvVar('PORT') || '5500', 10);
export const JWT_SECRET: string = getEnvVar('JWT_SECRET') as string;
export const JWT_EXPIRES_IN: string = getEnvVar('JWT_EXPIRES_IN') as string;

// Cloudinary / API
export const API_KEY: string = getEnvVar('API_KEY') as string;
export const API_SECRET: string = getEnvVar('API_SECRET') as string;
export const CLOUD_NAME: string = getEnvVar('CLOUD_NAME') as string;

// Database
export const DATABASE_URL: string | undefined = getEnvVar('DATABASE_URL', false);

export const DB_HOST: string | undefined =
  NODE_ENV === 'production' ? undefined : getEnvVar('DB_HOST', false);

export const DB_PORT: number | undefined =
  NODE_ENV === 'production' ? undefined : parseInt(getEnvVar('DB_PORT', false) || '5432', 10);

export const DB_USERNAME: string | undefined =
  NODE_ENV === 'production' ? undefined : getEnvVar('DB_USERNAME', false);

export const DB_PASSWORD: string | undefined =
  NODE_ENV === 'production' ? undefined : getEnvVar('DB_PASSWORD', false);

export const DB_NAME: string | undefined =
  NODE_ENV === 'production' ? undefined : getEnvVar('DB_NAME', false);

export const DB_SSL: boolean =
  NODE_ENV === 'production' ? true : getEnvVar('DB_SSL', false) === 'true';
