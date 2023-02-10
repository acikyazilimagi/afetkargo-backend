import "reflect-metadata";
import * as dotenv from 'dotenv';
import { UserSubscriber } from '../subscriber/user.subscriber';
import { dotEnvOptions } from './dotenv-options';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
dotenv.config(dotEnvOptions);

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,

  entities: [
    'dist/modules/**/*.entity{.ts,.js}',
    'dist/modules/**/*.view-entity{.ts,.js}',
    'dist/modules/**/**/*.entity{.ts,.js}',
  ],

  synchronize: true,

  // migrationsTableName: 'migrations',

  // migrations: ['dist/database/migrations/*.js'],
  cli: {
    // migrationsDir: 'src/database/migrations',
  },
  extra: {
    trustServerCertificate: true,
  },
  subscribers: [UserSubscriber],
  // ssl: process.env.MODE === 'production',
  ssl: false,
};


export default config;