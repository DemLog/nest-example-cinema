import { MigrationInterface, QueryRunner } from "typeorm";

export class FileUploadTable1680725154762 implements MigrationInterface {
    name = 'FileUploadTable1680725154762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "originalname" character varying NOT NULL, "mimetype" character varying NOT NULL, "size" integer NOT NULL, "createdAt" TIMESTAMP, "essenceTable" character varying, "essenceId" integer, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "file"`);
    }

}
