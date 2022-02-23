import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharactersRepository } from './characters.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CharactersRepository])],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
