import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSaldo1711289366439 implements MigrationInterface {
    name = 'CreateSaldo1711289366439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "saldo" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_665cfcbd54ab3dfbe8f6e50212" ON "user" ("saldo") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_665cfcbd54ab3dfbe8f6e50212"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "saldo"`);
    }

}
