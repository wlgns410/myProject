/* eslint-disable import/first */
import path from 'path';
import dotenv from 'dotenv';
import { DataSourceOptions, DataSource } from 'typeorm';
import SnakeNamingStrategy from '../database/namingStrategy/SnakeNamingStrategy';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join('.env.production') });
} else if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: path.join('.env.local') });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: path.join('.env.test') });
}

const NODE_ENV = process.env.NODE_ENV || 'local';
const { DB_LOCAL_HOST, DB_LOCAL_PORT, DB_LOCAL_USERNAME, DB_LOCAL_PASSWORD, DB_LOCAL_NAME, DB_LOCAL_TYPE } = process.env;
const { DB_TEST_HOST, DB_TEST_PORT, DB_TEST_USERNAME, DB_TEST_PASSWORD, DB_TEST_NAME } = process.env;
const { DB_PRODUCTION_HOST, DB_PRODUCTION_PORT, DB_PRODUCTION_USERNAME, DB_PRODUCTION_PASSWORD, DB_PRODUCTION_NAME } =
  process.env;

const config = {
  local: {
    host: DB_LOCAL_HOST,
    port: Number(DB_LOCAL_PORT),
    username: DB_LOCAL_USERNAME,
    password: DB_LOCAL_PASSWORD,
    database: DB_LOCAL_NAME,
  },
  test: {
    host: DB_TEST_HOST,
    port: Number(DB_TEST_PORT),
    username: DB_TEST_USERNAME,
    password: DB_TEST_PASSWORD,
    database: DB_TEST_NAME,
  },
  production: {
    host: DB_PRODUCTION_HOST,
    port: Number(DB_PRODUCTION_PORT),
    username: DB_PRODUCTION_USERNAME,
    password: DB_PRODUCTION_PASSWORD,
    database: DB_PRODUCTION_NAME,
  },
};

// const connectionConfig: DataSource = {
//   ...config[NODE_ENV],
//   type: DB_TYPE,
//   synchronize: NODE_ENV !== 'production',
//   entities: ['src/database/entity/*.ts'],
//   subscribers: ['src/database/subscriber/*.ts'],
//   migrations: ['src/database/migration/*.ts'],
//   cli: {
//     entitiesDir: 'src/database/entity',
//     migrationsDir: 'src/database/migration',
//     subscribersDir: 'src/database/subscriber',
//   },
//   namingStrategy: new SnakeNamingStrategy(),
//   dropSchema: NODE_ENV === 'test',
//   timezone: '+09:00',
// };

// export default connectionConfig;

const ConfigOption: DataSourceOptions = {
  ...config[NODE_ENV],
  type: 'mysql',
  // synchronize: NODE_ENV !== 'production',
  synchronize: true,
  entities: ['src/database/entity/*.ts'],
  subscribers: ['src/database/subscriber/*.ts'],
  migrations: ['src/database/migrations/*.{ts,js}'],
  migrationsTableName: 'migrations',
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migrations/*.{ts,js}',
    subscribersDir: 'src/database/subscriber',
  },
  namingStrategy: new SnakeNamingStrategy(),
  dropSchema: NODE_ENV === 'test',
  timezone: '+09:00',
  // cache: {
  //     type: "redis",
  //     options: {
  //         host: "localhost",
  //         port: 6379
  //     },
  // },
};

export const AppDataSource = new DataSource(ConfigOption);
