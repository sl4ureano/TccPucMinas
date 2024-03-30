import { MigrationInterface, QueryRunner } from "typeorm";

export class ArrumandoTudo1711317938274 implements MigrationInterface {
    name = 'ArrumandoTudo1711317938274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "createdAt"`);
    }

}
