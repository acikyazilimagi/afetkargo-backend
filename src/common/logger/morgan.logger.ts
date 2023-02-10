import * as morgan from 'morgan';
import * as rfs from 'rotating-file-stream';

const accessLogStream = rfs.createStream('./logs/access/access.log', {
    interval: '1d',
    size: '10M',
});

export const morganLogger = morgan('combined', {stream: accessLogStream});
