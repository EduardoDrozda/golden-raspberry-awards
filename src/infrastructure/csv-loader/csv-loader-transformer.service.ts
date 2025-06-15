import { CreateMovieWithAssociationsModel } from "@domain/models/movie.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CsvLoaderTransformerService {
  transform(raw: any): CreateMovieWithAssociationsModel {
    return {
      title: raw.title,
      year: parseInt(raw.year),
      winner: (raw.winner || '').trim().toLowerCase() === 'yes',
      producers: this.splitNames(raw.producers),
      studios: this.splitNames(raw.studios),
    };
  }

  private splitNames(value: string): string[] {
    if (!value) return [];
    return value
      .replace(/\s+and\s+/gi, ',')
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v.length > 0)
  }
}