import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { PaginationParamsDto } from '../../common/dto/pagination-params.dto';
import {
  ApiTags,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Character } from '../../models/character.entity';
import { DeleteResult } from 'typeorm';
import { GetEntitiesResponse } from '../../common/interfaces/get-entities-response.interface';

@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  @ApiCreatedResponse({ type: Character, description: 'Created' })
  @ApiBadRequestResponse({
    description: 'Validation error',
  })
  create(@Body() createCharacterDto: CreateCharacterDto): Promise<Character> {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Get list of characters' })
  findAll(
    @Query() paginationParams: PaginationParamsDto,
  ): Promise<GetEntitiesResponse<Character>> {
    if (paginationParams) {
      return this.charactersService.findAllWithPagination(paginationParams);
    }
    return this.charactersService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a character exists in the database',
    type: Number,
  })
  @ApiOkResponse({ type: Character })
  @ApiNotFoundResponse({ description: 'Not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Character> {
    return this.charactersService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a character exists in the database',
    type: Number,
  })
  @ApiBody({
    description: 'UpdateCharacterDto',
    required: true,
    type: UpdateCharacterDto,
  })
  @ApiOkResponse({ type: Character })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a character exists in the database',
    type: Number,
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiOkResponse({ type: DeleteResult })
  remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.charactersService.remove(id);
  }
}
