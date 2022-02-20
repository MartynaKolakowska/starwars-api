import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1645382190689 implements MigrationInterface {
    name = 'Init1645382190689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "starwars_character" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_fa8cc3ce8aa8ace01fd7eaa144d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "starwars_character"`);
    }

}
