import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCourseTable1758906334632 implements MigrationInterface {
    name = 'CreateCourseTable1758906334632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ADD "start_date" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "end_date" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "enrollment_start_date" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "enrollment_deadline" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "enrollment_deadline"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "enrollment_start_date"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "start_date"`);
    }

}
