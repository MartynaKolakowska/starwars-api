import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITIES } from '../../models';
import { SeederService } from './seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES)],
  providers: [SeederService],
})
export class SeederModule {}
