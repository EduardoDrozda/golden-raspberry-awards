import { EnviromentModule, EnviromentService } from "@common/enviroment";
import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { Knex } from "knex";
import { knex } from ".";
import { createReadStream, readFileSync } from "fs";
import * as path from "path";
import { LoggerModule, LoggerService } from "@common/logger";
import { parse } from 'fast-csv';

@Module({
  imports: [EnviromentModule, LoggerModule],

})
export class DatabaseModule implements OnApplicationBootstrap {
  private readonly database: Knex = knex;
  constructor(
    private readonly env: EnviromentService,
    private readonly loggerService: LoggerService
  ) {
    this.loggerService.context = DatabaseModule.name;
  }

  async onApplicationBootstrap() {
    await this.resetDatabase();
    this.loggerService.log("Init load dump by csv file");

    const filename = this.env.get("DB_BOOSTRAP_FILE");
    const filePath = path.join(__dirname, '..', '..', '..', '..', filename);
    const file = readFileSync(filePath, 'utf-8');

    if (!file) {
      this.loggerService.error(`File ${filename} not found.`);
      return;
    }

    await this.loadFromFile(filePath);
    this.loggerService.log("Finish load dump by csv file");
  }

  async loadFromFile(filePath: string): Promise<void> {
    const stream = createReadStream(filePath);

    return new Promise((resolve, reject) => {
      const parser = parse({ headers: true, delimiter: ';' });

      parser.on('data', async (row) => {
        parser.pause();

        try {
          await this.insertMovieWithAssociations(row);
        } catch (err) {
          this.loggerService.error(`Erro ao processar linha: ${row.title} - ${err.message}`);
        } finally {
          parser.resume();
        }
      });

      parser.on('end', resolve);
      parser.on('error', reject);

      stream.pipe(parser);
    });
  }

  private async insertMovieWithAssociations(row: any) {
    await this.database.transaction(async (trx) => {
      const [movie] = await trx.table('movies').insert({
        title: row.title,
        year: parseInt(row.year),
        winner: (row.winner || '').toLowerCase().trim() === 'yes'
      }).returning('*');

      const studios = this.splitNames(row.studios);
      const producers = this.splitNames(row.producers);

      await Promise.all([
        ...studios.map(async (name) => {
          const [studio] = await trx.table('studios').insert({ name }).returning('*');
          await trx.table('movie_studios').insert({
            movie_id: movie.id,
            studio_id: studio.id
          });
        }),
        ...producers.map(async (name) => {
          const [producer] = await trx.table('producers').insert({ name }).returning('*');
          await trx.table('movie_producers').insert({
            movie_id: movie.id,
            producer_id: producer.id
          });
        }),
      ]);
    }).catch((error) => {
      this.loggerService.error(`Error inserting movie with associations: ${error.message}`);
      throw error;
    });
  }


  private async resetDatabase() {
    await this.database('movie_studios').delete();
    await this.database('movie_producers').delete();
    await this.database('movies').delete();
    await this.database('studios').delete();
    await this.database('producers').delete();

    await this.database.raw("DELETE FROM sqlite_sequence WHERE name IN ('movie_studios', 'movie_producers', 'movies', 'studios', 'producers')");

    this.loggerService.log("Database reset successfully.");
  }

  private splitNames(value: string): string[] {
    if (!value) return [];
    return value
      .replace(/\s+and\s+/gi, ',')
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v.length > 0);
  }
}