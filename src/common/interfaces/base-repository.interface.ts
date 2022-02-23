import { PaginationParamsDto } from '../dto/pagination-params.dto';
import { DeleteResult } from 'typeorm';

export interface BaseRepositoryInterface<K, T> {
  createEntity(dto: K): Promise<T>;

  updateEntity(id: number, dto: Partial<K>): Promise<T>;

  findOneEntity(id: number): Promise<T>;

  findAll(paginationParams: PaginationParamsDto): Promise<{
    items: T[];
    count: number;
  }>;

  removeEntity(id: number): Promise<DeleteResult>;
}
