import { PaginationParamsDto } from '../dto/pagination-params.dto';
import { DeleteResult } from 'typeorm';
import { GetEntitiesResponse } from './get-entities-response.interface';

export interface BaseRepositoryInterface<K, T> {
  createEntity(dto: K): Promise<T>;

  updateEntity(id: number, dto: Partial<K>): Promise<T>;

  findOneEntity(id: number): Promise<T>;

  findAll(
    paginationParams: PaginationParamsDto,
  ): Promise<GetEntitiesResponse<T>>;

  removeEntity(id: number): Promise<DeleteResult>;
}
