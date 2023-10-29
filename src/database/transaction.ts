import { QueryRunner } from 'typeorm';
import  AppDataSource from '~/config/db';

// eslint-disable-next-line no-unused-vars
const transactionRunner = async (callback: (queryRunner: QueryRunner) => Promise<void>) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.startTransaction();

  try {
    await callback(queryRunner);
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
};

export default transactionRunner;
