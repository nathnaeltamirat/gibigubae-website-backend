import type { MigrationInterface, QueryRunner } from "typeorm";

export class IntializeTable1757425770193 implements MigrationInterface {
    name = 'IntializeTable1757425770193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "confession_father" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, CONSTRAINT "PK_d962ec61152f15e3935d98980f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."student_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TYPE "public"."student_role_enum" AS ENUM('student', 'admin', 'sub-admin', 'super_admin')`);
        await queryRunner.query(`CREATE TABLE "student" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "fatherName" character varying NOT NULL, "grandFatherName" character varying NOT NULL, "christianName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "gender" "public"."student_gender_enum" NOT NULL, "phone_number" character varying(15) NOT NULL, "idCardImagePath" character varying NOT NULL, "barcode" character varying, "role" "public"."student_role_enum" NOT NULL, "is_verified" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "confessionFatherId" integer, CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e" UNIQUE ("email"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "departmentName" character varying NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "language" ("id" SERIAL NOT NULL, "languageName" character varying NOT NULL, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_group" ("id" SERIAL NOT NULL, "serviceName" character varying NOT NULL, "description" text NOT NULL, "presidentId" integer, "vicePresidentId" integer, "secretaryId" integer, CONSTRAINT "PK_3c836a1da7ea3fc6390a05cc573" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_sub_group" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "serviceId" integer, "presidentId" integer, "vicePresidentId" integer, "secretaryId" integer, CONSTRAINT "PK_6945fc6eefa3bc25cd5f2e3e8b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_member" ("user_id" integer NOT NULL, "serviceGroup" integer NOT NULL, "serviceRole" character varying NOT NULL, "studentId" integer, "groupId" integer, "subGroupId" integer, CONSTRAINT "PK_c96a305301b9f4a0d4523639ee3" PRIMARY KEY ("user_id", "serviceGroup"))`);
        await queryRunner.query(`CREATE TABLE "sub_admin_permission" ("id" SERIAL NOT NULL, "permissions" json NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_7fda81ecd3612afe9188558221" UNIQUE ("userId"), CONSTRAINT "PK_ee1562d83ecbcb23bc4b4cfb21d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_language" ("user_id" integer NOT NULL, "language_id" integer NOT NULL, "studentId" integer, "languageId" integer, CONSTRAINT "PK_44d235663fb8c4f753eaca3ab6d" PRIMARY KEY ("user_id", "language_id"))`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_5bf08b8ef444b47294096c5f063" FOREIGN KEY ("confessionFatherId") REFERENCES "confession_father"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_group" ADD CONSTRAINT "FK_e71d66fc820c5049cec5856fda1" FOREIGN KEY ("presidentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_group" ADD CONSTRAINT "FK_a4b2f969aebd77121b032a03c10" FOREIGN KEY ("vicePresidentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_group" ADD CONSTRAINT "FK_8e65b7d755978dee2226b789b31" FOREIGN KEY ("secretaryId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_sub_group" ADD CONSTRAINT "FK_6d9825c1a4f18a765aa6d587c8d" FOREIGN KEY ("serviceId") REFERENCES "service_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_sub_group" ADD CONSTRAINT "FK_4f10241693180c9c3c12d6ef21d" FOREIGN KEY ("presidentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_sub_group" ADD CONSTRAINT "FK_ce4ad0b9c24f73d5c40a75506e9" FOREIGN KEY ("vicePresidentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_sub_group" ADD CONSTRAINT "FK_466a2dcb82abb87443c1e84182b" FOREIGN KEY ("secretaryId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_member" ADD CONSTRAINT "FK_ae9a0a88cdfb26eee8dc81b4641" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_member" ADD CONSTRAINT "FK_715a9fe0c704b0c330c5ea8cddf" FOREIGN KEY ("groupId") REFERENCES "service_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_member" ADD CONSTRAINT "FK_4117a20fe5783fe7342cf281568" FOREIGN KEY ("subGroupId") REFERENCES "service_sub_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_admin_permission" ADD CONSTRAINT "FK_7fda81ecd3612afe9188558221e" FOREIGN KEY ("userId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_language" ADD CONSTRAINT "FK_30add881c762f82cd6e95d3c5f6" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_language" ADD CONSTRAINT "FK_ce64abf864b84feda3b2d3d923e" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_language" DROP CONSTRAINT "FK_ce64abf864b84feda3b2d3d923e"`);
        await queryRunner.query(`ALTER TABLE "user_language" DROP CONSTRAINT "FK_30add881c762f82cd6e95d3c5f6"`);
        await queryRunner.query(`ALTER TABLE "sub_admin_permission" DROP CONSTRAINT "FK_7fda81ecd3612afe9188558221e"`);
        await queryRunner.query(`ALTER TABLE "service_member" DROP CONSTRAINT "FK_4117a20fe5783fe7342cf281568"`);
        await queryRunner.query(`ALTER TABLE "service_member" DROP CONSTRAINT "FK_715a9fe0c704b0c330c5ea8cddf"`);
        await queryRunner.query(`ALTER TABLE "service_member" DROP CONSTRAINT "FK_ae9a0a88cdfb26eee8dc81b4641"`);
        await queryRunner.query(`ALTER TABLE "service_sub_group" DROP CONSTRAINT "FK_466a2dcb82abb87443c1e84182b"`);
        await queryRunner.query(`ALTER TABLE "service_sub_group" DROP CONSTRAINT "FK_ce4ad0b9c24f73d5c40a75506e9"`);
        await queryRunner.query(`ALTER TABLE "service_sub_group" DROP CONSTRAINT "FK_4f10241693180c9c3c12d6ef21d"`);
        await queryRunner.query(`ALTER TABLE "service_sub_group" DROP CONSTRAINT "FK_6d9825c1a4f18a765aa6d587c8d"`);
        await queryRunner.query(`ALTER TABLE "service_group" DROP CONSTRAINT "FK_8e65b7d755978dee2226b789b31"`);
        await queryRunner.query(`ALTER TABLE "service_group" DROP CONSTRAINT "FK_a4b2f969aebd77121b032a03c10"`);
        await queryRunner.query(`ALTER TABLE "service_group" DROP CONSTRAINT "FK_e71d66fc820c5049cec5856fda1"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_5bf08b8ef444b47294096c5f063"`);
        await queryRunner.query(`DROP TABLE "user_language"`);
        await queryRunner.query(`DROP TABLE "sub_admin_permission"`);
        await queryRunner.query(`DROP TABLE "service_member"`);
        await queryRunner.query(`DROP TABLE "service_sub_group"`);
        await queryRunner.query(`DROP TABLE "service_group"`);
        await queryRunner.query(`DROP TABLE "language"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TYPE "public"."student_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."student_gender_enum"`);
        await queryRunner.query(`DROP TABLE "confession_father"`);
    }

}
