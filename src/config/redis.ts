import * as redis from 'redis';
import path from 'path';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join('.env.production') });
} else if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: path.join('.env.local') });
}

const NODE_ENV = process.env.NODE_ENV || 'local';
const { REDIS_USER_NAME, REDIS_USER_PASSWORD, REDIS_USER_HOST, REDIS_USER_PORT } = process.env;
const {
  REDIS_PRODUCTION_USER_NAME,
  REDIS_PRODUCTION_USER_PASSWORD,
  REDIS_PRODUCTION_USER_HOST,
  REDIS_PRODUCTION_USER_PORT,
} = process.env;

const config = {
  local: {
    host: REDIS_USER_HOST,
    port: Number(REDIS_USER_PORT),
    username: REDIS_USER_NAME,
    password: REDIS_USER_PASSWORD,
  },
  production: {
    host: REDIS_PRODUCTION_USER_HOST,
    port: Number(REDIS_PRODUCTION_USER_PORT),
    username: REDIS_PRODUCTION_USER_NAME,
    password: REDIS_PRODUCTION_USER_PASSWORD,
  },
};

// * Redis 연결
const selectedConfig = config[NODE_ENV];

const redisClient = redis.createClient({
  legacyMode: true,
  username: selectedConfig.username,
  password: selectedConfig.password,
  socket: {
    host: selectedConfig.host,
    port: selectedConfig.port,
  },
});
redisClient.on('connect', () => {
  console.info('Redis connected!');
});
redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
  redisCli.quit();
});
redisClient.connect().then();
const redisCli = redisClient.v4;

export default redisCli;
