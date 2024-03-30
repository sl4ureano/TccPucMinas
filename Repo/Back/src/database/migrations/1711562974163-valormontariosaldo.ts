import { MigrationInterface, QueryRunner } from "typeorm";

export class Valormontariosaldo1711562974163 implements MigrationInterface {
    name = 'Valormontariosaldo1711562974163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "saldo" TYPE numeric(8,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "saldo" TYPE numeric(6,2)`);
    }

}
