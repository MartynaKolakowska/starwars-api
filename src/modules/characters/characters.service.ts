import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharactersRepository } from './characters.repository';
import { PaginationParamsDto } from '../../common/dto/pagination-params.dto';
import { Character } from '../../models/character.entity';
import { DeleteResult } from 'typeorm';
import { GetEntitiesResponse } from '../../common/interfaces/get-entities-response.interface';

@Injectable()
export class CharactersService {
  constructor(private readonly characterRepository: CharactersRepository) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    return this.characterRepository.createEntity(createCharacterDto);
  }

  async findAllWithPagination(
    paginationParams: PaginationParamsDto,
  ): Promise<GetEntitiesResponse<Character>> {
    return this.characterRepository.findAll(paginationParams);
  }

  async findAll(): Promise<GetEntitiesResponse<Character>> {
    const items = await this.characterRepository.find();
    return { items };
  }

  async findOne(id: number): Promise<Character> {
    return this.characterRepository.findOneEntity(id);
  }

  async update(
    id: number,
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    return this.characterRepository.updateEntity(id, updateCharacterDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.characterRepository.removeEntity(id);
  }
}
