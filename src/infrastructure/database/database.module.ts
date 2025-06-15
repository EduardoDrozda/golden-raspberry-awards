import { EnviromentModule, EnviromentService } from "@common/enviroment";
import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { LoggerModule } from "@common/logger";
import { DatabaseInitService } from "./database-init.service";
import { CsvLoaderModule, CsvLoaderService, CsvLoaderTransformerService } from "@infrastructure/csv-loader";

@Module({
  imports: [EnviromentModule, LoggerModule, CsvLoaderModule],
  providers: [
    DatabaseInitService,
    CsvLoaderService,
    CsvLoaderTransformerService
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