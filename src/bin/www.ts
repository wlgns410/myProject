import 'reflect-metadata';
import http from 'http';
import app from '../../app';
import { AppDataSource } from '~/config/data-source';

const server = http.createServer(app);
const PORT: number = Number(process.env.PORT) || 3000;
const hostname = '0.0.0.0';

AppDataSource.initialize().then(() => console.log("☘️ DB Connection")); // 추가

server.listen(PORT, hostname, () => {
  console.log(`⚡️[server]: Server is running at 0.0.0.0:${PORT}`);
});
