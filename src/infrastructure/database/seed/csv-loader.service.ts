import { Injectable } from "@nestjs/common";
import { parse } from "fast-csv";
import { createReadStream } from "fs";

@Injectable()
export class CsvLoaderService {
  async load(filePath: string, onRow: (rawRow: any) => Promise<void>) {
    return new Promise((resolve, reject) => {
      const stream = createReadStream(filePath);
      const parser = parse({ headers: true, delimiter: ';' });

      parser.on('data', (row) => {
        onRow(row).catch(reject);
      });

      parser.on('end', resolve);
      parser.on('error', reject);

      stream.pipe(parser);
    });
  }
}