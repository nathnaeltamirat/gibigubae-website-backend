import type { MigrationInterface, QueryRunner } from "typeorm";

export class FixName1757839096235 implements MigrationInterface {
    name = 'FixName1757839096235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" RENAME COLUMN "phoneNumber" TO "phone_number"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" RENAME COLUMN "phone_number" TO "phoneNumber"`);
    }

}
