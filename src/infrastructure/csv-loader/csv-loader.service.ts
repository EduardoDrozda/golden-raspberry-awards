import { Injectable } from "@nestjs/common";
import { parse } from "fast-csv";
import { createReadStream } from "fs";

@Injectable()
export class CsvLoaderService {
  async load(filePath: string, onRow: (rawRow: any) => Promise<void>) {
    const rowPromises: Promise<void>[] = [];

    return new Promise<void>((resolve, reject) => {
      const stream = createReadStream(filePath);
      const parser = parse({ headers: true, delimiter: ';' });

      parser.on('data', (row) => {
        const task = onRow(row).catch(reject);
        rowPromises.push(task);
      });

      parser.on('end', async () => {
        await Promise.all(rowPromises);
        resolve();
      });

      parser.on('error', reject);

      stream.pipe(parser);
    });
  }
}