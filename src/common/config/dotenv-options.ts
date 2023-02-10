import * as path from 'path';

const env = process.env.NODE_ENV || 'local';

const p = path.join(process.cwd(), `env/.env.${env}`);

const dotEnvOptions = {
  path: p,
};

export { dotEnvOptions };