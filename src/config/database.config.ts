import { registerAs } from '@nestjs/config';
import { ENTITIES } from '../model';
import { MIGRATIONS } from '../migrations';

export default registerAs('database', () => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
    entityPrefix: 'starwars_',
    migrations: MIGRATIONS,
    cli: {
      migrationsDir: 'src/migrations',
    },
    entities: ENTITIES,
  };
});
