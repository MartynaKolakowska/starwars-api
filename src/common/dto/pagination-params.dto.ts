import { IsOptional, Min, IsInt, IsString, IsEnum } from 'class-validator';
import { PaginationOrderBy } from '../../utils/const/const';
import { Type } from 'class-transformer';

export class PaginationParamsDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  readonly take?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  readonly skip?: number;

  @IsOptional()
  @IsString()
  @IsEnum(PaginationOrderBy)
  readonly order?: PaginationOrderBy;
}
