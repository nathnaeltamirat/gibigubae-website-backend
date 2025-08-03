import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
const getEnvVar = (name) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is not defined`);
    }
    return value;
};
export const PORT = parseInt(getEnvVar('PORT'), 10);
export const DB_USERNAME = getEnvVar('DB_USERNAME');
export const DB_PASSWORD = getEnvVar('DB_PASSWORD');
export const DB_NAME = getEnvVar('DB_NAME');
export const DB_HOST = getEnvVar('DB_HOST');
export const DB_PORT = parseInt(getEnvVar('DB_PORT'), 10);
export const DB_SSL = getEnvVar('DB_SSL') === 'true';
//# sourceMappingURL=env.js.map