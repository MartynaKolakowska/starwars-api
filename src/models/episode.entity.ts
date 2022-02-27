import { ApiHideProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { Base } from './base.entity';
import { Character } from './character.entity';
import { Planet } from './planet.entity';

@Entity()
export class Episode extends Base {
  @Column({
    length: 64,
  })
  title: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  episodeId: number;

  @Column({
    length: 64,
    nullable: true,
  })
  director: string;

  @Column({
    length: 64,
    nullable: true,
  })
  producer: string;

  @Column({
    length: 255,
    nullable: true,
  })
  description: string;

  @ManyToMany(() => Character, (character) => character.episodes)
  @JoinTable()
  characters: Character[];

  @ManyToMany(() => Planet, (planets) => planets.episodes)
  @JoinTable()
  planets: Planet[];
}
