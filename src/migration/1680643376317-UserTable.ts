import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1680643376317 implements MigrationInterface {
    name = 'UserTable1680643376317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Profile" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "age" integer NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_89dff233f744d59758158aca1d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Auth" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "profileId" integer, CONSTRAINT "REL_0f395e74ee03f742a9f2d60302" UNIQUE ("profileId"), CONSTRAINT "PK_fee4a2ee6693dbef79c39ff336d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Auth" ADD CONSTRAINT "FK_0f395e74ee03f742a9f2d603028" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Auth" DROP CONSTRAINT "FK_0f395e74ee03f742a9f2d603028"`);
        await queryRunner.query(`DROP TABLE "Auth"`);
        await queryRunner.query(`DROP TABLE "Profile"`);
    }

}
