import type { MigrationInterface, QueryRunner } from "typeorm";

export class FixStudentTable1757931131449 implements MigrationInterface {
    name = 'FixStudentTable1757931131449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ADD "id_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "christian_name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "christian_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "id_number"`);
    }

}
