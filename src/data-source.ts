import { DataSource } from "typeorm";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
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

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  logging: true,
  entities: [Student,ConfessionFather,Department,Language,ServiceGroup,ServiceMember,ServiceSubGroup,SubAdminPermission,UserLanguage],
  subscribers: [],
 migrations: process.env.NODE_ENV === "production"
    ? ["dist/migration/**/*.js"]
    : [],
     migrationsTableName: "migrations",

});
