import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME, } from "./config/env.js";
import { Student } from "./entity/Student.js";
import { ConfessionFather } from "./entity/ConfessionFather.js";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false,
    logging: true,
    entities: [Student, ConfessionFather],
    subscribers: [],
    migrations: ["src/migration/**/*.ts"],
    migrationsTableName: "migrations",
});
//# sourceMappingURL=data-source.js.map