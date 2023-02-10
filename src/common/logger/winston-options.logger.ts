import { LoggerOptions } from 'winston';
import * as RotatingFile from 'winston-daily-rotate-file';
import * as winston from 'winston';

const combinedRotatingFileTransport: RotatingFile = new RotatingFile({
  datePattern: 'YYYY-MM-DD',
  filename: 'logs/%DATE%-combined.log',
  level: 'info',
  maxFiles: '14d',
  maxSize: '20m',
});

const errorRotatingFileTransport: RotatingFile = new RotatingFile({
    datePattern: 'YYYY-MM-DD',
    filename: 'logs/%DATE%-error.log',
    level: 'error',
    maxFiles: '14d',
    maxSize: '20m'
});

const developmentConsoleRotatingTransport = new winston.transports.Console({
    format: winston.format.simple(),
    level: 'silly',
});

const winstonOptions : LoggerOptions = {
    transports: [
        combinedRotatingFileTransport, 
        errorRotatingFileTransport,
        developmentConsoleRotatingTransport
    ]
};

export default winstonOptions;