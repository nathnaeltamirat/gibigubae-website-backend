export class AttendanceCreation1757856611512 {
    name = 'AttendanceCreation1757856611512';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "enrollments" ("id" SERIAL NOT NULL, "studentId" integer, "courseId" integer, CONSTRAINT "PK_7c0f752f9fb68bf6ed7367ab00f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."attendance_status_enum" AS ENUM('present', 'late', 'absent')`);
        await queryRunner.query(`CREATE TABLE "attendance" ("attendance_id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "status" "public"."attendance_status_enum" NOT NULL DEFAULT 'absent', "code" character varying, "studentId" integer, "courseId" integer, CONSTRAINT "PK_b1577f082402d8226bcd4aed679" PRIMARY KEY ("attendance_id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("course_id" SERIAL NOT NULL, "course_name" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_42dc69837b2e7bc603686ddaf53" PRIMARY KEY ("course_id"))`);
        await queryRunner.query(`ALTER TABLE "enrollments" ADD CONSTRAINT "FK_bf3ba3dfa95e2df7388eb4589fd" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrollments" ADD CONSTRAINT "FK_60dd0ae4e21002e63a5fdefeec8" FOREIGN KEY ("courseId") REFERENCES "courses"("course_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_120e1c6edcec4f8221f467c8039" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_e59b75368eccc762b3e1fc6c450" FOREIGN KEY ("courseId") REFERENCES "courses"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_e59b75368eccc762b3e1fc6c450"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_120e1c6edcec4f8221f467c8039"`);
        await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_60dd0ae4e21002e63a5fdefeec8"`);
        await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_bf3ba3dfa95e2df7388eb4589fd"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "attendance"`);
        await queryRunner.query(`DROP TYPE "public"."attendance_status_enum"`);
        await queryRunner.query(`DROP TABLE "enrollments"`);
    }
}
//# sourceMappingURL=1757856611512-attendance-creation.js.map