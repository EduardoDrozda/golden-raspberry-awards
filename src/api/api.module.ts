import { Module } from "@nestjs/common";
import { ProducerController } from "./controllers";
import { UseCasesModule } from "@application/use-cases/use-cases.module";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [
    UseCasesModule,
    CacheModule.register({
      ttl: 60000 // 1 minute
    })
  ],
  controllers: [ProducerController],
})
export class ApiModule { }