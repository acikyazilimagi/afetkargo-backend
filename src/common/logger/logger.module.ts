import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import winstonOptions from './winston-options.logger';

@Module({
    imports: [
        WinstonModule.forRoot(winstonOptions)
    ]
})
export class LoggerModule {}
