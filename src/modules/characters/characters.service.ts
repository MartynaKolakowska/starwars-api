import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharactersRepository } from './characters.repository';
import { PaginationParamsDto } from '../../common/dto/pagination-params.dto';

@Injectable()
export class CharactersService {
  constructor(private readonly characterRepository: CharactersRepository) {}

  create(createCharacterDto: CreateCharacterDto) {
    return this.characterRepository.createEntity(createCharacterDto);
  }

  findAllWithPagination(paginationParams: PaginationParamsDto) {
    return this.characterRepository.findAll(paginationParams);
  }

  findAll() {
    return this.characterRepository.find();
  }

  findOne(id: number) {
    return this.characterRepository.findOneEntity(id);
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return this.characterRepository.updateEntity(id, updateCharacterDto);
  }

  remove(id: number) {
    return this.characterRepository.removeEntity(id);
  }
}
