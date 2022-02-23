import { Repository, EntityRepository } from 'typeorm';
import { Character } from 'src/models/character.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { BaseRepositoryInterface } from 'src/common/interfaces/base-repository.interface';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@EntityRepository(Character)
export class CharactersRepository
  extends Repository<Character>
  implements BaseRepositoryInterface<CreateCharacterDto, Character>
{
  async createEntity(createCharacterDto: CreateCharacterDto) {
    const character = await this.create(createCharacterDto);
    await this.save(character);
    return character;
  }

  async updateEntity(id: number, updateCharacterDto: UpdateCharacterDto) {
    return this.save(updateCharacterDto);
  }

  async findOneEntity(id: number) {
    return this.findOne(id, {
      relations: ['planets', 'episodes'],
    });
  }

  async findAll(paginationParams: PaginationParamsDto) {
    const [items, count] = await this.findAndCount({
      order: {
        id: paginationParams.order,
      },
      take: paginationParams.take,
      skip: paginationParams.skip,
      relations: ['planets', 'episodes'],
    });
    return {
      items,
      count,
    };
  }

  async removeEntity(id: number) {
    return this.delete(id);
  }
}
