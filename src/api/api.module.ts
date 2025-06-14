import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { HttpExceptionFilter } from "./interceptors/filters";
import { ResponseInterceptor } from "./interceptors";
import { ProducerController } from "./controllers";
import { UseCasesModule } from "@application/use-cases/use-cases.module";

@Module({
  imports: [UseCasesModule],
  controllers: [ProducerController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ]
})
export class ApiModule { }