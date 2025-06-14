import { EnviromentModule, EnviromentService } from "@common/enviroment";
import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { LoggerModule } from "@common/logger";
import { DatabaseInitService } from "./database-init.service";
import { CsvImporterService, CsvLoaderService, CsvTransformerService } from "./seed";

@Module({
  imports: [EnviromentModule, LoggerModule],
  providers: [
    DatabaseInitService,
    CsvLoaderService,
    CsvTransformerService,
    CsvImporterService
  ],
})
export class DatabaseModule implements OnApplicationBootstrap {
  constructor(
    private readonly databaseInit: DatabaseInitService
  ) { }
  async onApplicationBootstrap() {
    await this.databaseInit.init();
  }
}