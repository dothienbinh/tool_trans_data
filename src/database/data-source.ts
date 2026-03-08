import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '123456',
  database: process.env.DB_NAME || 'student_db',

  entities: ['dist/entities/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
