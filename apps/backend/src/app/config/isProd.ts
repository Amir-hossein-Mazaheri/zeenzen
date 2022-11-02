import { ConfigModule } from '@nestjs/config';

export async function isProd() {
  await ConfigModule.envVariablesLoaded; // ensures that .env is loaded

  const { NODE_ENV } = process.env;

  return NODE_ENV && NODE_ENV?.toLowerCase() === 'production';
}
