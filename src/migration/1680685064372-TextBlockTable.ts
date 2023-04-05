import { MigrationInterface, QueryRunner } from "typeorm";

export class TextBlockTable1680685064372 implements MigrationInterface {
    name = 'TextBlockTable1680685064372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "text_block" ("id" SERIAL NOT NULL, "uniqueName" character varying NOT NULL, "title" character varying NOT NULL, "image" character varying, "text" character varying NOT NULL, "group" character varying NOT NULL, CONSTRAINT "PK_ea456f18c87d0e038045dd2fe30" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "text_block"`);
    }

}
