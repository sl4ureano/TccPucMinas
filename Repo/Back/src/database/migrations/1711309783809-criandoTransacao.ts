import { MigrationInterface, QueryRunner } from "typeorm";

export class CriandoTransacao1711309783809 implements MigrationInterface {
    name = 'CriandoTransacao1711309783809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "img" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoria"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoriaimg"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoriaId" integer`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "total" numeric(6,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_4571d9be1660f363029320af4da" FOREIGN KEY ("categoriaId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_4571d9be1660f363029320af4da"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoriaId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoriaimg" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoria" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
