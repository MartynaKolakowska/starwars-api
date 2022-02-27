import { Test, TestingModule } from '@nestjs/testing';
import { PaginationParamsDto } from '../../common/dto/pagination-params.dto';
import { CharactersController } from './characters.controller';
import { CharactersRepository } from './characters.repository';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

jest.mock('./characters.service');

describe('CharactersController', () => {
  let controller: CharactersController;
  let service: CharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [CharactersService, CharactersRepository],
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
    service = module.get<CharactersService>(CharactersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the "findAll"', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call the "findAll" method with pagination', () => {
    const paginationDto = new PaginationParamsDto();
    controller.findAll(paginationDto);
    expect(service.findAllWithPagination).toHaveBeenCalled();
    expect(service.findAllWithPagination).toHaveBeenCalledWith(paginationDto);
  });

  it('should call the "create" method', () => {
    const createCharacterDto = new CreateCharacterDto();
    controller.create(createCharacterDto);
    expect(service.create).toHaveBeenCalled();
    expect(service.create).toHaveBeenCalledWith(createCharacterDto);
  });

  it('should call the "findOne"  method', () => {
    const id = 1;
    controller.findOne(1);
    expect(service.findOne).toBeCalled();
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should call the "update"  method', () => {
    const id = 1;
    const updateCharacterDto = new UpdateCharacterDto();
    controller.update(1, updateCharacterDto);
    expect(service.update).toBeCalled();
    expect(service.update).toHaveBeenCalledWith(id, updateCharacterDto);
  });

  it('should call the "remove"  method', () => {
    const id = 1;
    controller.remove(1);
    expect(service.remove).toBeCalled();
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
