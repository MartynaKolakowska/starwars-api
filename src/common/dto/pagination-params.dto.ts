import { IsOptional, Min, IsInt, IsString, IsEnum } from 'class-validator';
import { PaginationOrderBy } from '../../utils/const/const';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationParamsDto {
  @ApiProperty({
    description: 'Rows to take',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  readonly take?: number;

  @ApiProperty({
    description: 'Rows to skip',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  readonly skip?: number;

  @ApiProperty({
    description: 'Sort order(by id)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEnum(PaginationOrderBy)
  readonly order?: PaginationOrderBy;
}
