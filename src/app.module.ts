import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { NestHttpExceptionFilter } from './common/exceptions/exception.filter';
import { LoggerModule } from './common/logger/logger.module';
import { EmailerModule } from './common/services/emailer/emailer.module';
import { dotEnvOptions } from './common/config/dotenv-options';
import { DatabaseModule } from './database/database.module';
import { CommonModule, AuthModule, UserModule, CargoModule, AdminModule, HealthModule } from './modules';
dotenv.config(dotEnvOptions);

@Module({
  imports: [
    DatabaseModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    UserModule,
    AuthModule,
    LoggerModule,
    EmailerModule,
    CommonModule,
    CargoModule,
    AdminModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NestHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
