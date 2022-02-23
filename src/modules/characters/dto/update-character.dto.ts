import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './create-character.dto';
import { IsNumber, IsOptional, IsInt } from 'class-validator';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {}
