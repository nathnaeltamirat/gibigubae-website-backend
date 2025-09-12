export class AddingNullable1757654679661 {
    name = 'AddingNullable1757654679661';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "academic_info" ALTER COLUMN "year" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "academic_info" ALTER COLUMN "dormBlock" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "academic_info" ALTER COLUMN "roomNumber" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "academic_info" ALTER COLUMN "roomNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "academic_info" ALTER COLUMN "dormBlock" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "academic_info" ALTER COLUMN "year" SET NOT NULL`);
    }
}
//# sourceMappingURL=1757654679661-addingNullable.js.map