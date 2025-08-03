export class CreateConfessionFatheAndStudentTable1754222498585 {
    name = 'CreateConfessionFatheAndStudentTable1754222498585';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "confession_father" ("id" SERIAL NOT NULL, "full_name" character varying(100) NOT NULL, "phone_number" character varying(15) NOT NULL, CONSTRAINT "PK_d962ec61152f15e3935d98980f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."student_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TYPE "public"."student_role_enum" AS ENUM('student', 'admin', 'sub-admin', 'super_admin')`);
        await queryRunner.query(`CREATE TABLE "student" ("id" SERIAL NOT NULL, "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "christian_name" character varying(100) NOT NULL, "gender" "public"."student_gender_enum" NOT NULL, "phone_number" character varying(15) NOT NULL, "id_card_image_path" character varying NOT NULL, "barcode" character varying NOT NULL, "is_verified" boolean NOT NULL, "role" "public"."student_role_enum" NOT NULL, "confessionFatherId" integer, CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_5bf08b8ef444b47294096c5f063" FOREIGN KEY ("confessionFatherId") REFERENCES "confession_father"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_5bf08b8ef444b47294096c5f063"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TYPE "public"."student_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."student_gender_enum"`);
        await queryRunner.query(`DROP TABLE "confession_father"`);
    }
}
//# sourceMappingURL=1754222498585-CreateConfessionFatheAndStudentTable.js.map