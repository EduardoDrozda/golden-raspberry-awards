import { Module } from '@nestjs/common';
import { CsvLoaderService } from './csv-loader.service';
import { CsvLoaderTransformerService } from './csv-loader-transformer.service';

@Module({
  providers: [CsvLoaderService, CsvLoaderTransformerService],
  exports: [CsvLoaderService, CsvLoaderTransformerService],
})
export class CsvLoaderModule {}
