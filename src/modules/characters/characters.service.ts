import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharactersRepository } from './characters.repository';

@Injectable()
export class CharactersService {
  constructor(private readonly characterRepository: CharactersRepository) {}
  create(createCharacterDto: CreateCharacterDto) {
    return 'This action adds a new character';
  }

  findAll() {
    return this.characterRepository.find();
  }

  findOne(id: number) {
    return this.characterRepository.findOne(id);
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
