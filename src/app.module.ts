import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

import dbConfiguration from './config/database.config';
import apiConfiguration from './config/api.config';
import { CharactersModule } from './modules/characters/characters.module';
import { SeederModule } from './modules/seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfiguration, apiConfiguration],
    }),
    DatabaseModule,
    CharactersModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
