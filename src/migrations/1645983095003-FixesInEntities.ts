import {MigrationInterface, QueryRunner} from "typeorm";

export class FixesInEntities1645983095003 implements MigrationInterface {
    name = 'FixesInEntities1645983095003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "starwars_planet" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(64) NOT NULL, "population" integer, "climate" character varying, "description" character varying(255), CONSTRAINT "PK_9d93c7224518c254e250dd6657d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "starwars_episode" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, "episodeId" integer, "director" character varying(64), "producer" character varying(64), "description" character varying(255), CONSTRAINT "PK_87df5270d63e473cbdb97b95d48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "starwars_episode_characters_character" ("episodeId" integer NOT NULL, "characterId" integer NOT NULL, CONSTRAINT "PK_dcf8ad4f69eb925cae06d372a6e" PRIMARY KEY ("episodeId", "characterId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1bad28b3a1ea993dc483cfde98" ON "starwars_episode_characters_character" ("episodeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d05a831194fbfc098f320474cb" ON "starwars_episode_characters_character" ("characterId") `);
        await queryRunner.query(`CREATE TABLE "starwars_episode_planets_planet" ("episodeId" integer NOT NULL, "planetId" integer NOT NULL, CONSTRAINT "PK_4d302c929c4a8d494d61d863242" PRIMARY KEY ("episodeId", "planetId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2e4b3322a5f67ca3c37c5092c3" ON "starwars_episode_planets_planet" ("episodeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9f53b65ec94a6a0cd910b47d75" ON "starwars_episode_planets_planet" ("planetId") `);
        await queryRunner.query(`ALTER TABLE "starwars_character" ADD "name" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "starwars_character" ADD "description" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "starwars_character" ADD "gender" character varying(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "starwars_character" ADD "birthYear" character varying(32)`);
        await queryRunner.query(`ALTER TABLE "starwars_character" ADD "height" integer`);
        await queryRunner.query(`ALTER TABLE "starwars_character" ADD "planetId" integer`);
        await queryRunner.query(`ALTER TABLE "starwars_character" ADD CONSTRAINT "FK_c69fd04a0b0b012071af6767d01" FOREIGN KEY ("planetId") REFERENCES "starwars_planet"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "starwars_episode_characters_character" ADD CONSTRAINT "FK_1bad28b3a1ea993dc483cfde98a" FOREIGN KEY ("episodeId") REFERENCES "starwars_episode"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "starwars_episode_characters_character" ADD CONSTRAINT "FK_d05a831194fbfc098f320474cb4" FOREIGN KEY ("characterId") REFERENCES "starwars_character"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "starwars_episode_planets_planet" ADD CONSTRAINT "FK_2e4b3322a5f67ca3c37c5092c3e" FOREIGN KEY ("episodeId") REFERENCES "starwars_episode"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "starwars_episode_planets_planet" ADD CONSTRAINT "FK_9f53b65ec94a6a0cd910b47d759" FOREIGN KEY ("planetId") REFERENCES "starwars_planet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "starwars_episode_planets_planet" DROP CONSTRAINT "FK_9f53b65ec94a6a0cd910b47d759"`);
        await queryRunner.query(`ALTER TABLE "starwars_episode_planets_planet" DROP CONSTRAINT "FK_2e4b3322a5f67ca3c37c5092c3e"`);
        await queryRunner.query(`ALTER TABLE "starwars_episode_characters_character" DROP CONSTRAINT "FK_d05a831194fbfc098f320474cb4"`);
        await queryRunner.query(`ALTER TABLE "starwars_episode_characters_character" DROP CONSTRAINT "FK_1bad28b3a1ea993dc483cfde98a"`);
        await queryRunner.query(`ALTER TABLE "starwars_character" DROP CONSTRAINT "FK_c69fd04a0b0b012071af6767d01"`);
        await queryRunner.query(`ALTER TABLE "starwars_character" DROP COLUMN "planetId"`);
        await queryRunner.query(`ALTER TABLE "starwars_character" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "starwars_character" DROP COLUMN "birthYear"`);
        await queryRunner.query(`ALTER TABLE "starwars_character" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "starwars_character" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "starwars_character" DROP COLUMN "name"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9f53b65ec94a6a0cd910b47d75"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2e4b3322a5f67ca3c37c5092c3"`);
        await queryRunner.query(`DROP TABLE "starwars_episode_planets_planet"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d05a831194fbfc098f320474cb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1bad28b3a1ea993dc483cfde98"`);
        await queryRunner.query(`DROP TABLE "starwars_episode_characters_character"`);
        await queryRunner.query(`DROP TABLE "starwars_episode"`);
        await queryRunner.query(`DROP TABLE "starwars_planet"`);
    }

}
