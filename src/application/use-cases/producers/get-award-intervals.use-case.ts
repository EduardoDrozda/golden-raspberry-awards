import { GetAwardsDto, GetAwardsResponseDto } from "@application/dtos/producers";
import { IProducersRepository, PRODUCERS_REPOSITORY } from "@application/repositories";
import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "../IUse-case";
import { ProducerModelWithMovies } from "@domain/models/producter.model";
import { LoggerService } from "@common/logger";

@Injectable()
export class GetAwardIntervalsUseCase implements IUseCase<void, GetAwardsResponseDto> {
  constructor(
    @Inject(PRODUCERS_REPOSITORY) private readonly producerRepository: IProducersRepository,
    private readonly loggerService: LoggerService
  ) {
    this.loggerService.context = GetAwardIntervalsUseCase.name;
  }

  async execute(): Promise<GetAwardsResponseDto> {
    this.loggerService.log("Executing usecase...");

    const producersWithMovies = await this.producerRepository.findProducersWithWinnersMovies();
    this.loggerService.log(`Found ${producersWithMovies.length} producers with movies.`);

    const groupedProducers = this.groupMoviesByProducer(producersWithMovies);
    return this.getAwardIntervals(groupedProducers);
  }

  private groupMoviesByProducer(producersWithMovies: ProducerModelWithMovies[]): ProducerModelWithMovies[] {
    const groupedProducers = new Map<string, ProducerModelWithMovies>();

    for (const producer of producersWithMovies) {

      if (!groupedProducers.has(producer.name)) {
        groupedProducers.set(producer.name, { ...producer, movies: [] });
      }

      groupedProducers.get(producer.name)!.movies.push(...producer.movies);
    }

    return Array.from(groupedProducers.values());
  }

  private getAwardIntervals(producersWithMovies: ProducerModelWithMovies[]): GetAwardsResponseDto {
    const intervals = producersWithMovies.flatMap(({ name, movies }) => {
      const winYears = movies
        .map(m => m.year)
        .sort((a, b) => a - b);

      if (winYears.length < 2) return [];

      return winYears.slice(1).map((year, i) => ({
        producer: name,
        interval: year - winYears[i],
        previousWin: winYears[i],
        followingWin: year
      }));
    });

    const min = Math.min(...intervals.map(i => i.interval));
    const max = Math.max(...intervals.map(i => i.interval));

    return {
      min: intervals.filter(i => i.interval === min),
      max: intervals.filter(i => i.interval === max),
    };
  }
}