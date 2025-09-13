import { config } from 'dotenv';
config({});
const getEnvVar = (name) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is not defined`);
    }
    return value;
};
export const DATABASE_URL = getEnvVar('DATABASE_URL');
export const NODE_ENV = getEnvVar('NODE_ENV');
export const PORT = parseInt(getEnvVar('PORT'), 10);
export const JWT_SECRET = getEnvVar('JWT_SECRET');
export const JWT_REFRESH_SECRET = getEnvVar('JWT_REFRESH_SECRET');
export const JWT_REFRESH_EXPIRES_IN = getEnvVar('JWT_REFRESH_EXPIRES_IN');
export const JWT_EXPIRES_IN = getEnvVar('JWT_EXPIRES_IN');
export const DB_USERNAME = getEnvVar('DB_USERNAME');
export const DB_PASSWORD = getEnvVar('DB_PASSWORD');
export const API_KEY = getEnvVar('API_KEY');
export const API_SECRET = getEnvVar('API_SECRET');
export const CLOUD_NAME = getEnvVar('CLOUD_NAME');
export const DB_NAME = getEnvVar('DB_NAME');
export const DB_HOST = getEnvVar('DB_HOST');
export const DB_PORT = parseInt(getEnvVar('DB_PORT'), 10);
export const DB_SSL = getEnvVar('DB_SSL') === 'true';
//# sourceMappingURL=env.js.map