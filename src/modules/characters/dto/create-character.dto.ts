import {
  IsOptional,
  IsNotEmpty,
  IsEnum,
  Min,
  Max,
  MaxLength,
  IsInt,
} from 'class-validator';
import {
  CharacterGender,
  MIN_HEIGHT_IN_CM,
  MAX_HEIGHT_IN_CM,
  LONG_STRING_LENGHT,
  SHORT_STRING_LENGTH,
  MID_STRING_LENGTH,
} from '../../../utils/const/const';

export class CreateCharacterDto {
  @MaxLength(MID_STRING_LENGTH)
  @IsNotEmpty()
  name: string;

  @MaxLength(LONG_STRING_LENGHT)
  @IsOptional()
  description: string;

  @MaxLength(SHORT_STRING_LENGTH)
  @IsEnum(CharacterGender)
  @IsNotEmpty()
  gender: string;

  @MaxLength(SHORT_STRING_LENGTH)
  @IsOptional()
  birthYear: string;

  @IsInt()
  @Min(MIN_HEIGHT_IN_CM)
  @Max(MAX_HEIGHT_IN_CM)
  @IsOptional()
  height: number;

  //   @ManyToMany(() => Episode, (episode) => episode.characters)
  //   episodes: Episode[];

  //   @OneToMany(() => Planet, (planet) => planet.characters)
  //   planet: Planet;
}
