import { Test, TestingModule } from '@nestjs/testing';
import { CharactersRepository } from './characters.repository';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

describe('CharactersService', () => {
  let service: CharactersService;
  let charactersRepository;
  const mockCharacterRepository = () => ({
    createEntity: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn(),
    findOneEntity: jest.fn(),
    removeEntity: jest.fn(),
    updateEntity: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        {
          provide: CharactersRepository,
          useFactory: mockCharacterRepository,
        },
      ],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
    charactersRepository =
      module.get<CharactersRepository>(CharactersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call "find" function', () => {
    service.findAll();
    expect(charactersRepository.find).toBeCalled();
  });

  it('should call "findOne" function', () => {
    const id = 1;
    service.findOne(id);
    expect(charactersRepository.findOneEntity).toBeCalled();
    expect(charactersRepository.findOneEntity).toHaveBeenCalledWith(id);
  });

  it('should call "createEntity" function', () => {
    const dto = new CreateCharacterDto();
    service.create(dto);
    expect(charactersRepository.createEntity).toBeCalled();
    expect(charactersRepository.createEntity).toHaveBeenCalledWith(dto);
  });

  it('should call "updateEntity" function', () => {
    const dto = new UpdateCharacterDto();
    const id = 1;
    service.update(id, dto);
    expect(charactersRepository.updateEntity).toBeCalled();
    expect(charactersRepository.updateEntity).toHaveBeenCalledWith(id, dto);
  });

  it('should call "removeEntity" function', () => {
    const id = 1;
    service.remove(id);
    expect(charactersRepository.removeEntity).toBeCalled();
    expect(charactersRepository.removeEntity).toHaveBeenCalledWith(id);
  });
});
