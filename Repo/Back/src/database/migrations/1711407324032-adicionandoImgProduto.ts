import { MigrationInterface, QueryRunner } from "typeorm";

export class AdicionandoImgProduto1711407324032 implements MigrationInterface {
    name = 'AdicionandoImgProduto1711407324032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "imagem" TO "imagemId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "imagemId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "imagemId" uuid`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_d4b706fb9e3e867f0e6dbfaad4f" FOREIGN KEY ("imagemId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_d4b706fb9e3e867f0e6dbfaad4f"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "imagemId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "imagemId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "imagemId" TO "imagem"`);
    }

}
