import {
  IsOptional,
  IsNotEmpty,
  IsEnum,
  Min,
  Max,
  MaxLength,
  IsInt,
  IsNumber,
  IsNumberString,
  IsArray,
} from 'class-validator';
import {
  CharacterGender,
  MIN_HEIGHT_IN_CM,
  MAX_HEIGHT_IN_CM,
  LONG_STRING_LENGHT,
  SHORT_STRING_LENGTH,
  MID_STRING_LENGTH,
} from '../../../utils/const/const';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCharacterDto {
  @ApiProperty()
  @MaxLength(MID_STRING_LENGTH)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: false,
    description: 'Description',
  })
  @MaxLength(LONG_STRING_LENGHT)
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Gender',
    enum: CharacterGender,
  })
  @MaxLength(SHORT_STRING_LENGTH)
  @IsEnum(CharacterGender)
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    required: false,
    description: 'Birth Year',
    example: '33BBY',
  })
  @MaxLength(SHORT_STRING_LENGTH)
  @IsOptional({})
  birthYear: string;

  @ApiProperty({
    required: false,
    description: 'Height of the character in cm.',
  })
  @IsInt()
  @Min(MIN_HEIGHT_IN_CM)
  @Max(MAX_HEIGHT_IN_CM)
  @IsOptional()
  @Type(() => Number)
  height: number;

  @ApiProperty({
    required: false,
    description: 'Array of episode IDs',
  })
  @Type(() => Number)
  @IsArray()
  @IsNumber({}, { each: true })
  episodeIds: number[];

  @ApiProperty({
    required: false,
    description: 'Planet ID',
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  planetId: number;
}
