export class CreateCourseTable1758906334632 {
    name = 'CreateCourseTable1758906334632';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "courses" ADD "start_date" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "end_date" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "enrollment_start_date" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "enrollment_deadline" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "enrollment_deadline"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "enrollment_start_date"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "start_date"`);
    }
}
//# sourceMappingURL=1758906334632-CreateCourseTable.js.map