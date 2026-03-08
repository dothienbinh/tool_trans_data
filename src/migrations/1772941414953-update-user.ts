import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser1772941414953 implements MigrationInterface {
  name = 'UpdateUser1772941414953';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying, "email" character varying, "action" character varying, "before" character varying, "after" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
