import { Repository, EntityRepository } from 'typeorm';
import { Character } from '../../models/character.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { BaseRepositoryInterface } from '../../common/interfaces/base-repository.interface';
import { PaginationParamsDto } from '../../common/dto/pagination-params.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Character)
export class CharactersRepository
  extends Repository<Character>
  implements BaseRepositoryInterface<CreateCharacterDto, Character>
{
  async createEntity(createCharacterDto: CreateCharacterDto) {
    try {
      const { episodeIds, ...dto } = createCharacterDto;
      const character = await this.create({
        ...dto,
        episodes: episodeIds.map((id) => ({ id })),
      });
      return this.save(character);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async updateEntity(id: number, updateCharacterDto: UpdateCharacterDto) {
    const { episodeIds, ...dto } = updateCharacterDto;
    const character = await this.findOne(id);
    if (!character) {
      throw new NotFoundException();
    }
    return this.save({
      ...character,
      episodes: episodeIds.map((id) => ({ id })),
      ...dto,
    });
  }

  async findOneEntity(id: number) {
    const character = await this.findOne(id, {
      relations: ['planet', 'episodes'],
    });
    if (!character) {
      throw new NotFoundException();
    }
    return character;
  }

  async findAll(paginationParams: PaginationParamsDto) {
    try {
      const [items, count] = await this.findAndCount({
        order: {
          id: paginationParams.order,
        },
        take: paginationParams.take,
        skip: paginationParams.skip,
        relations: ['planet', 'episodes'],
      });
      return {
        items,
        count,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async removeEntity(id: number) {
    const characterToRemove = await this.findOne(id);
    if (!characterToRemove) {
      throw new NotFoundException();
    }
    try {
      return this.delete(id);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
