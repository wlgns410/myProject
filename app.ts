/* eslint-disable import/first */
import path from 'path';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join('.env.production') });
} else if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: path.join('.env.dev') });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: path.join('.env.test') });
} 

import express  from 'express';
import cors from 'cors';

const app = express();

app.use(
    cors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      exposedHeaders: ['Authorization'],
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

export default app;
