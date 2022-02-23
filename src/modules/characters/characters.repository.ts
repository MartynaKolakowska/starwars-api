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
      const character = await this.create(createCharacterDto);
      await this.save(character);
      return character;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async updateEntity(id: number, updateCharacterDto: UpdateCharacterDto) {
    //TODO:
    return this.save(updateCharacterDto);
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
