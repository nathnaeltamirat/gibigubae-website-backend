import { DataSource } from "typeorm";
import {
  DATABASE_URL,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_SSL,
  NODE_ENV,
} from "./config/env.js";
import { Student } from "./entity/Student.js";
import { ConfessionFather } from "./entity/ConfessionFather.js";
import { Department } from "./entity/Department.js";
import { Language } from "./entity/Language.js";
import { ServiceGroup } from "./entity/ServiceGroup.js";
import { ServiceMember } from "./entity/ServiceMember.js";
import { ServiceSubGroup } from "./entity/ServiceSubGroup.js";
import { SubAdminPermission } from "./entity/SubAdminPermission.js";
import { UserLanguage } from "./entity/UserLanguage.js";
import { AcademicInfo } from "./entity/AcademicInfo.js";

const isProduction = NODE_ENV === "production";

if (isProduction && !DATABASE_URL) {
  throw new Error("DATABASE_URL must be defined in production");
}

export const AppDataSource = new DataSource(
  isProduction
    ? {
        type: "postgres",
        url: DATABASE_URL!, // non-null assertion, safe because we checked above
        ssl: { rejectUnauthorized: false },
        synchronize: false,
        logging: true,
        entities: [
          Student,
          ConfessionFather,
          Department,
          Language,
          ServiceGroup,
          ServiceMember,
          ServiceSubGroup,
          SubAdminPermission,
          UserLanguage,
          AcademicInfo,
        ],
        subscribers: [],
        migrations: ["dist/migration/**/*.js"],
        migrationsTableName: "migrations",
      }
    : {
        type: "postgres",
        host: DB_HOST!,
        port: DB_PORT!,
        username: DB_USERNAME!,
        password: DB_PASSWORD!,
        database: DB_NAME!,
        ssl: DB_SSL,
        synchronize: false,
        logging: true,
        entities: [
          Student,
          ConfessionFather,
          Department,
          Language,
          ServiceGroup,
          ServiceMember,
          ServiceSubGroup,
          SubAdminPermission,
          UserLanguage,
          AcademicInfo,
        ],
        subscribers: [],
        migrations: ["src/migration/**/*.ts"],
        migrationsTableName: "migrations",
      }
);
