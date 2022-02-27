import { Base } from './base.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Character } from './character.entity';
import { Episode } from './episode.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Planet extends Base {
  @Column({
    length: 64,
  })
  name: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  population: number;

  @Column({
    nullable: true,
  })
  climate: string;

  @Column({
    length: 255,
    nullable: true,
  })
  description: string;

  @OneToMany(() => Character, (characters) => characters.planet)
  characters: Character[];

  @ManyToMany(() => Episode, (episodes) => episodes.planets)
  episodes: Episode[];
}
