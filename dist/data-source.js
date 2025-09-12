import { DataSource } from "typeorm";
import { DATABASE_URL, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME, NODE_ENV, } from "./config/env.js";
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
const dataSourceOptions = isProduction
    ? {
        type: "postgres",
        url: DATABASE_URL,
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
        host: DB_HOST || "127.0.0.1",
        port: Number(DB_PORT) || 5432,
        username: DB_USERNAME || "postgres",
        password: DB_PASSWORD || "",
        database: DB_NAME || "aastu_gibi_gubae",
        ssl: false,
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
    };
export const AppDataSource = new DataSource(dataSourceOptions);
//# sourceMappingURL=data-source.js.map