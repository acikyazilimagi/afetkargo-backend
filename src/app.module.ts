import { CommonModule } from './modules/common/common.module';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { NestHttpExceptionFilter } from './common/filters/exception.filter';
import { LoggerModule } from './common/logger/logger.module';
import { EmailerModule } from './common/services/emailer/emailer.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import * as dotenv from 'dotenv';
import { dotEnvOptions } from './common/config/dotenv-options';
import { CargoModule } from './modules/cargo/cargo.module';
import { AdminModule } from './modules/admin/admin.module';
import { HealthModule } from './modules/health/health.module';
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
