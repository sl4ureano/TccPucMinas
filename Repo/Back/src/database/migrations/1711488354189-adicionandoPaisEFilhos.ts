import { MigrationInterface, QueryRunner } from "typeorm";

export class AdicionandoPaisEFilhos1711488354189 implements MigrationInterface {
    name = 'AdicionandoPaisEFilhos1711488354189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "parentId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c86f56da7bb30c073e3cbed4e50" FOREIGN KEY ("parentId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c86f56da7bb30c073e3cbed4e50"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "parentId"`);
    }

}
