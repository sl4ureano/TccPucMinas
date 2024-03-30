import { MigrationInterface, QueryRunner } from "typeorm";

export class PaiEfILHOSOUTRAVERSAO1711495235535 implements MigrationInterface {
    name = 'PaiEfILHOSOUTRAVERSAO1711495235535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_relation" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "parent_id" integer, "child_id" integer, CONSTRAINT "PK_5c0ceea627fc59f56b6df0c33d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_relation" ADD CONSTRAINT "FK_9dedeeb63dfc18a0a565c12b968" FOREIGN KEY ("parent_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_relation" ADD CONSTRAINT "FK_d165e9b06d678ce724fae70eaf9" FOREIGN KEY ("child_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_relation" DROP CONSTRAINT "FK_d165e9b06d678ce724fae70eaf9"`);
        await queryRunner.query(`ALTER TABLE "user_relation" DROP CONSTRAINT "FK_9dedeeb63dfc18a0a565c12b968"`);
        await queryRunner.query(`DROP TABLE "user_relation"`);
    }

}
