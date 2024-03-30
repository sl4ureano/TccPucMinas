import { MigrationInterface, QueryRunner } from "typeorm";

export class AdicionandoTransactionCerta1711415619903 implements MigrationInterface {
    name = 'AdicionandoTransactionCerta1711415619903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transaction_type_enum" AS ENUM('compra', 'transferencia', 'extorno', 'recarga')`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "type" "public"."transaction_type_enum" NOT NULL DEFAULT 'compra'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`);
    }

}
