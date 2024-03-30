import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeToDecimal1711289754071 implements MigrationInterface {
    name = 'ChangeToDecimal1711289754071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_665cfcbd54ab3dfbe8f6e50212"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "saldo"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "saldo" numeric(6,2)`);
        await queryRunner.query(`CREATE INDEX "IDX_665cfcbd54ab3dfbe8f6e50212" ON "user" ("saldo") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_665cfcbd54ab3dfbe8f6e50212"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "saldo"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "saldo" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_665cfcbd54ab3dfbe8f6e50212" ON "user" ("saldo") `);
    }

}
