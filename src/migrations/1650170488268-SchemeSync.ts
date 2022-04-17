import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemeSync1650170488268 implements MigrationInterface {
  name = "SchemeSync1650170488268";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coffee"
        ADD "description" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
  }

}
