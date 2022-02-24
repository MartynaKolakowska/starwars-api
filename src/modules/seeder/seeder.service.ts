import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from '../../models/character.entity';
import { Repository, In } from 'typeorm';
import { Planet } from '../../models/planet.entity';
import { planetsMock } from '../../utils/mocks/planets';
import { ConfigService } from '@nestjs/config';
import { charactersMock } from '../../utils/mocks/characters';
import { Episode } from '../../models/episode.entity';
import { episodesMock } from '../../utils/mocks/episodes';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Character)
    private readonly charactersRepository: Repository<Character>,
    @InjectRepository(Planet)
    private readonly planetsRepository: Repository<Planet>,
    @InjectRepository(Episode)
    private readonly episodesRepository: Repository<Episode>,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    const seedDatabase = this.configService.get('api.seedDatabase');
    if (seedDatabase) {
      console.log('seed');
      await this.seedPlanets();
      await this.seedCharacters();
      await this.seedEpisodes();
    }
  }

  async seedPlanets() {
    try {
      const [_, count] = await this.planetsRepository.findAndCount();
      if (count) {
        return;
      }
      return Promise.all(
        planetsMock.map((planet) => {
          return this.planetsRepository.save(planet);
        }),
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  async seedCharacters() {
    const [_, count] = await this.charactersRepository.findAndCount();
    if (count) {
      return;
    }
    return Promise.all(
      charactersMock.map(async (characterMock) => {
        const { planet, ...mock } = characterMock;
        const chareacterPlanet = await this.planetsRepository.findOne({
          name: characterMock.planet,
        });
        return this.charactersRepository.save({
          ...mock,
          planet: chareacterPlanet,
        });
      }),
    );
  }

  async seedEpisodes() {
    const [_, count] = await this.episodesRepository.findAndCount();
    if (count) {
      return;
    }
    return Promise.all(
      episodesMock.map(async (episodeMock) => {
        const { planets, characters, ...mock } = episodeMock;
        const episodePlanets = await this.planetsRepository.find({
          where: {
            name: In(planets),
          },
        });
        const episodeCharacters = await this.charactersRepository.find({
          where: {
            name: In(characters),
          },
        });
        return this.episodesRepository.save({
          ...mock,
          planets: episodePlanets,
          characters: episodeCharacters,
        });
      }),
    );
  }
}
