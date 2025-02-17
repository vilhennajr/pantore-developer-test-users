import 'reflect-metadata';
import { UserEntity } from 'src/modules/users/domain/user.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'teste3',
  synchronize: false,
  logging: true,
  entities: [UserEntity],
  migrations: ['src/infrastructure/database/migrations/*.ts'],
});
