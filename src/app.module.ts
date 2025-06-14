import { ApiModule } from '@api/api.module';
import { EnviromentModule } from '@common/enviroment';
import { LoggerModule } from '@common/logger';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { RepositoriesModule } from '@infrastructure/repositories/repositories.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    LoggerModule, 
    EnviromentModule, 
    ApiModule, 
    RepositoriesModule, 
    DatabaseModule
  ],
})
export class AppModule { }
