import { MigrationInterface, QueryRunner } from "typeorm";

export class PaiEfILHOSvoltandoo1711542067169 implements MigrationInterface {
    name = 'PaiEfILHOSvoltandoo1711542067169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "emailParent" character varying`);
        await queryRunner.query(`CREATE INDEX "IDX_68824835399f247b49695a7118" ON "user" ("emailParent") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_68824835399f247b49695a7118"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "emailParent"`);
    }

}
