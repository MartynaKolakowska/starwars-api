import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Episode } from './episode.entity';
import { Planet } from './planet.entity';
import {
  MID_STRING_LENGTH,
  LONG_STRING_LENGHT,
  SHORT_STRING_LENGTH,
} from '../utils/const/const';

@Entity()
export class Character extends Base {
  @Column({
    length: MID_STRING_LENGTH,
  })
  name: string;

  @Column({
    length: LONG_STRING_LENGHT,
    nullable: true,
  })
  description: string;

  @Column({
    length: SHORT_STRING_LENGTH,
  })
  gender: string;

  @Column({
    length: SHORT_STRING_LENGTH,
    nullable: true,
  })
  birthYear: string;

  @Column({
    nullable: true,
    type: 'int',
  })
  height: number;

  @ManyToMany(() => Episode, (episode) => episode.characters, {
    onUpdate: 'CASCADE',
    nullable: true,
  })
  episodes: Episode[];

  @OneToMany(() => Planet, (planet) => planet.characters, {
    onUpdate: 'CASCADE',
    nullable: true,
  })
  planet: Planet;
}
