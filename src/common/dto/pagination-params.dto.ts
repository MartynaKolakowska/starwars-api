import {
  IsOptional,
  IsNumber,
  Min,
  IsInt,
  IsString,
  IsIn,
  IsEnum,
} from 'class-validator';
import { PaginationOrderBy } from 'src/utils/const/const';

export class PaginationParamsDto {
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  readonly take?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  readonly skip?: number;

  @IsOptional()
  @IsString()
  @IsEnum(PaginationOrderBy)
  readonly order?: PaginationOrderBy;
}
