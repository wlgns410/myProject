/* eslint-disable import/first */
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import morgan from 'morgan';

// Load environment variables based on NODE_ENV
let envPath = '.env.local'; // Default to development environment

if (process.env.NODE_ENV === 'production') {
  envPath = '.env.production';
} else if (process.env.NODE_ENV === 'local') {
  envPath = '.env.local';
} else if (process.env.NODE_ENV === 'test') {
  envPath = '.env.test';
}

dotenv.config({ path: path.join(__dirname, envPath) });

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

// log setting
// 로그 형식 정의
morgan.format('detailed', ':method :url :status :res[content-length] - :response-time ms :remote-addr - :remote-user :referrer :user-agent');
app.use(morgan('detailed')); // dev, detailed 등 중 자세히 보기로 설정

// Define a simple endpoint
if (process.env.NODE_ENV === 'local') {
  app.get('/test', (req, res) => {
    res.send('로컬 테스트 중');
  });
}

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(
      swaggerJsDoc({
        swaggerDefinition: {
          openapi: '3.0.0',
          info: {
            title: 'MyProject API',
            version: '1.0.0',
          },
          schemes: ['http', 'https'],
          host: 'localhost:5001',
          components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                name: 'authorization',
                bearerFormat: 'JWT',
                in: 'header',
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
        apis: ['./src/routes/**/index*.ts', './src/routes/**/swagger.yml'],
      }),
    ),
  );
}

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

export default app;
