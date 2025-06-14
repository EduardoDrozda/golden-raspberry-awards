import { LoggerModule } from "@common/logger";
import { RepositoriesModule } from "@infrastructure/repositories/repositories.module";
import { Module } from "@nestjs/common";
import { PRODUCERS_USE_CASES } from "./producers";

@Module({
  imports: [RepositoriesModule, LoggerModule],
  providers: [...PRODUCERS_USE_CASES],
  exports: [...PRODUCERS_USE_CASES]
})
export class UseCasesModule {
}