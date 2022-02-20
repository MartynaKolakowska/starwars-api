import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity()
export class Character extends BaseEntity {
  @Column()
  name: string;
}