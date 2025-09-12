import { config } from "dotenv";
config();
const getEnvVar = (name, required = true) => {
    const value = process.env[name];
    if (!value && required) {
        throw new Error(`Environment variable ${name} is not defined`);
    }
    return value;
};
// General
export const NODE_ENV = getEnvVar("NODE_ENV");
export const PORT = parseInt(getEnvVar("PORT") || "5500", 10);
export const JWT_SECRET = getEnvVar("JWT_SECRET");
export const JWT_EXPIRES_IN = getEnvVar("JWT_EXPIRES_IN");
// Cloudinary / API
export const API_KEY = getEnvVar("API_KEY");
export const API_SECRET = getEnvVar("API_SECRET");
export const CLOUD_NAME = getEnvVar("CLOUD_NAME");
// Database
export const DATABASE_URL = getEnvVar("DATABASE_URL", false);
export const DB_HOST = NODE_ENV === "production" ? undefined : getEnvVar("DB_HOST", false);
export const DB_PORT = NODE_ENV === "production"
    ? undefined
    : parseInt(getEnvVar("DB_PORT", false) || "5432", 10);
export const DB_USERNAME = NODE_ENV === "production" ? undefined : getEnvVar("DB_USERNAME", false);
export const DB_PASSWORD = NODE_ENV === "production" ? undefined : getEnvVar("DB_PASSWORD", false);
export const DB_NAME = NODE_ENV === "production" ? undefined : getEnvVar("DB_NAME", false);
export const DB_SSL = NODE_ENV === "production" ? true : getEnvVar("DB_SSL", false) === "true";
//# sourceMappingURL=env.js.map