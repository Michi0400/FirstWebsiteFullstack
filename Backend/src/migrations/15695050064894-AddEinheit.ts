import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEinheit15695050064894 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rezept_angaben_angabe" ADD COLUMN "einheit" varchar(255)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rezept_angaben_angabe" DROP COLUMN "einheit"`, undefined);
    }

}
