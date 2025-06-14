import { EnviromentService } from "@common/enviroment";
import { LoggerService } from "@common/logger";
import { Knex } from "knex";
import { knex } from ".";
import * as path from "path";
import { createReadStream, existsSync } from "fs";

import pLimit from "p-limit";
import { CsvImporterService } from "./seed/csv-importer.service";
import { CsvLoaderService } from "./seed/csv-loader.service";
import { CsvTransformerService } from "./seed/csv-transformer.service";
import { Injectable } from "@nestjs/common";

const CONCURRENCY_LIMIT = 100;

@Injectable()
export class DatabaseInitService {
  private readonly database: Knex = knex;

  constructor(
    private readonly loader: CsvLoaderService,
    private readonly transformer: CsvTransformerService,
    private readonly importer: CsvImporterService,
    private readonly env: EnviromentService,
    private readonly loggerService: LoggerService
  ) {
    this.loggerService.context = 'Database';
  }

  async init() {
    await this.resetDatabase();

    const filename = this.env.get("DB_BOOSTRAP_FILE");
    const filePath = path.join(process.cwd(), 'assets', filename);

    if (!existsSync(filePath)) {
      this.loggerService.error(`File ${filename} not found. Initialize with empty database`);
      return;
    }

    const limit = pLimit(CONCURRENCY_LIMIT);

    this.loggerService.log(`Loading data from ${filename}...`);
    await this.loader.load(filePath, async (rawRow) => {
      const dto = this.transformer.transform(rawRow);
      await limit(() => this.importer.import(dto));
    });
  }

  private async resetDatabase() {
    await this.database('movies_studios').delete();
    await this.database('movies_producers').delete();
    await this.database('movies').delete();
    await this.database('studios').delete();
    await this.database('producers').delete();

    await this.database.raw("DELETE FROM sqlite_sequence WHERE name IN ('movie_studios', 'movie_producers', 'movies', 'studios', 'producers')");

    this.loggerService.log("Database reset successfully.");
  }
}