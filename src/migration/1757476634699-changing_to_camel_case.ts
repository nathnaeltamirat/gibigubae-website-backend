import type { MigrationInterface, QueryRunner } from "typeorm";

export class ChangingToCamelCase1757476634699 implements MigrationInterface {
    name = 'ChangingToCamelCase1757476634699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "is_verified"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "phoneNumber" character varying(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD "isVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "student" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "isVerified"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "student" ADD "is_verified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "student" ADD "phone_number" character varying(15) NOT NULL`);
    }

}
