import { ApiModule } from '@api/api.module';
import { EnviromentModule } from '@common/enviroment';
import { LoggerModule } from '@common/logger';
import { Module } from '@nestjs/common';

@Module({
  imports: [LoggerModule, EnviromentModule, ApiModule],
})
export class AppModule {}
