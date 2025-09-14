export class FixName1757839096235 {
    name = 'FixName1757839096235';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "student" RENAME COLUMN "phoneNumber" TO "phone_number"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "student" RENAME COLUMN "phone_number" TO "phoneNumber"`);
    }
}
//# sourceMappingURL=1757839096235-fixName.js.map