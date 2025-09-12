import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddingAcademicInfo1757654168122 implements MigrationInterface {
    name = 'AddingAcademicInfo1757654168122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "academic_info" ("id" SERIAL NOT NULL, "year" character varying NOT NULL, "dormBlock" character varying NOT NULL, "roomNumber" character varying NOT NULL, "userId" integer, "departmentId" integer, CONSTRAINT "REL_80c2ae2808bfe54d36a12aed49" UNIQUE ("userId"), CONSTRAINT "PK_f8f803c5c51f95882d24da87976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "academic_info" ADD CONSTRAINT "FK_80c2ae2808bfe54d36a12aed49c" FOREIGN KEY ("userId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "academic_info" ADD CONSTRAINT "FK_74a352b024089eae8dd2b94fc1f" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "academic_info" DROP CONSTRAINT "FK_74a352b024089eae8dd2b94fc1f"`);
        await queryRunner.query(`ALTER TABLE "academic_info" DROP CONSTRAINT "FK_80c2ae2808bfe54d36a12aed49c"`);
        await queryRunner.query(`DROP TABLE "academic_info"`);
    }

}
