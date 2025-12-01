import { DataSource } from "typeorm";
import { DATABASE_URL, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_SSL, NODE_ENV, } from "./config/env.js";
import { student } from "./entity/Student.js";
import { confession_father } from "./entity/ConfessionFather.js";
import { department } from "./entity/Department.js";
import { language } from "./entity/Language.js";
import { service_group } from "./entity/ServiceGroup.js";
import { service_member } from "./entity/ServiceMember.js";
import { service_sub_group } from "./entity/ServiceSubGroup.js";
import { sub_admin_permission } from "./entity/SubAdminPermission.js";
import { user_language } from "./entity/UserLanguage.js";
import { academic_info } from "./entity/AcademicInfo.js";
import { attendance } from "./entity/Attendance.js";
import { course } from "./entity/Course.js";
import { enrollment } from "./entity/Enrollment.js";
import { AttendanceSession } from "./entity/AttendanceSession.js";
const isProduction = NODE_ENV === "production";
if (isProduction && !DATABASE_URL) {
    throw new Error("DATABASE_URL must be defined in production");
}
export const AppDataSource = new DataSource({
    type: "postgres",
    ...(isProduction
        ? {
            url: DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        }
        : {
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_NAME,
            ssl: DB_SSL,
        }),
    synchronize: false,
    logging: true,
    entities: [
        student,
        confession_father,
        department,
        language,
        service_group,
        service_member,
        service_sub_group,
        sub_admin_permission,
        user_language,
        academic_info,
        course,
        AttendanceSession,
        attendance,
        enrollment,
    ],
    subscribers: [],
    migrations: ["src/migration/**/*.ts"],
    migrationsTableName: "migrations",
});
//# sourceMappingURL=data-source.js.map