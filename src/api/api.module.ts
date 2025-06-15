import { Module } from "@nestjs/common";
import { ProducerController } from "./controllers";
import { UseCasesModule } from "@application/use-cases/use-cases.module";

@Module({
  imports: [UseCasesModule],
  controllers: [ProducerController],
})
export class ApiModule { }