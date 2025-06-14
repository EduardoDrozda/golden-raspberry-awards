import { GetAwardsResponseDto } from "@application/dtos/producers";
import { IProducersRepository, PRODUCERS_REPOSITORY } from "@application/repositories";
import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "../IUse-case";

@Injectable()
export class GetAwardIntervalsUseCase implements IUseCase<void, GetAwardsResponseDto> {
  constructor(
    @Inject(PRODUCERS_REPOSITORY) private readonly producerRepository: IProducersRepository
  ) { }

  async execute(): Promise<any> {
    const producersWithMovies = await this.producerRepository.findProducersWithMovies();
    return;
  }
}