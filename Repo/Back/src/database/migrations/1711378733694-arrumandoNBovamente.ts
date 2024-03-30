import { MigrationInterface, QueryRunner } from "typeorm";

export class ArrumandoNBovamente1711378733694 implements MigrationInterface {
    name = 'ArrumandoNBovamente1711378733694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "img" TO "imgId"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "imgId"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "imgId" uuid`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_adfbfd64aa652b27278e43585db" FOREIGN KEY ("imgId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_adfbfd64aa652b27278e43585db"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "imgId"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "imgId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "imgId" TO "img"`);
    }

}
