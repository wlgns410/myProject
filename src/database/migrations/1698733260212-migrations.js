const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class Migrations1698733260212 {
  name = 'Migrations1698733260212';

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE \`tbl_user\` (
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`email\` varchar(30) NOT NULL,
                \`password\` varchar(30) NOT NULL,
                \`nickname\` varchar(30) NULL,
                \`phone\` varchar(11) NOT NULL,
                \`user_type\` varchar(15) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`tbl_user_phone_auth\` (
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`auth_nums\` varchar(4) NOT NULL,
                \`phone\` varchar(11) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            DROP TABLE \`tbl_user_phone_auth\`
        `);
    await queryRunner.query(`
            DROP TABLE \`tbl_user\`
        `);
  }
};
