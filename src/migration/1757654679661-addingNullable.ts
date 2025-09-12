import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddingNullable1757654679661 implements MigrationInterface {
    name = 'AddingNullable1757654679661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "academic_info" ALTER COLUMN "year" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "academic_info" ALTER COLUMN "dormBlock" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "academic_info" ALTER COLUMN "roomNumber" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "academic_info" ALTER COLUMN "roomNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "academic_info" ALTER COLUMN "dormBlock" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "academic_info" ALTER COLUMN "year" SET NOT NULL`);
    }

}
