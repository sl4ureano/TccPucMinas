import { MigrationInterface, QueryRunner } from "typeorm";

export class CriandoProdutos1711308926270 implements MigrationInterface {
    name = 'CriandoProdutos1711308926270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "preco" numeric(6,2) NOT NULL, "imagem" character varying NOT NULL, "categoria" character varying NOT NULL, "categoriaimg" character varying NOT NULL, "isLoading" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_products_product" ("transactionId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_7ddf967cc5b99d0e61028fde7a2" PRIMARY KEY ("transactionId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9cc6383ab5794c26fef12a42d2" ON "transaction_products_product" ("transactionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d5538d5c1e50e9e1c7a5bd909f" ON "transaction_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "transaction_products_product" ADD CONSTRAINT "FK_9cc6383ab5794c26fef12a42d26" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "transaction_products_product" ADD CONSTRAINT "FK_d5538d5c1e50e9e1c7a5bd909f5" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_products_product" DROP CONSTRAINT "FK_d5538d5c1e50e9e1c7a5bd909f5"`);
        await queryRunner.query(`ALTER TABLE "transaction_products_product" DROP CONSTRAINT "FK_9cc6383ab5794c26fef12a42d26"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d5538d5c1e50e9e1c7a5bd909f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9cc6383ab5794c26fef12a42d2"`);
        await queryRunner.query(`DROP TABLE "transaction_products_product"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
