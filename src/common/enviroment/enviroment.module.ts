import { Module } from '@nestjs/common';
import { EnviromentService } from './enviroment.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV || ''}`
      ],
      validate,
      isGlobal: true,
    }),
  ],
  providers: [EnviromentService],
  exports: [EnviromentService]
})
export class EnviromentModule { }
