export class DefaultValue1757475005144 {
    name = 'DefaultValue1757475005144';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "role" SET DEFAULT 'student'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "role" DROP DEFAULT`);
    }
}
//# sourceMappingURL=1757475005144-default_value.js.map