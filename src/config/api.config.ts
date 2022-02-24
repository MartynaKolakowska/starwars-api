import { registerAs } from '@nestjs/config';

export default registerAs('api', () => {
  return {
    port: process.env.API_PORT,
    seedDatabase: process.env.SEED_DATABASE,
  };
});
