import type { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultValue1757475005144 implements MigrationInterface {
    name = 'DefaultValue1757475005144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "role" SET DEFAULT 'student'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "role" DROP DEFAULT`);
    }

}
