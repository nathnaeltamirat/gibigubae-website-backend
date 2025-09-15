export class FixStudentTable1757931131449 {
    name = 'FixStudentTable1757931131449';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "student" ADD "id_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "christian_name" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "christian_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "id_number"`);
    }
}
//# sourceMappingURL=1757931131449-fix_student_table.js.map