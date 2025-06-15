import { GetAwardIntervalsUseCase } from '@application/use-cases/producers';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';

@Controller('producers')
export class ProducerController {
  constructor(private readonly getAwardIntervalsUseCase: GetAwardIntervalsUseCase) { }

  @ApiOperation({
    summary: 'Get producers with longest and shortest win intervals',
    description: 'Returns producers with the longest and shortest gaps between two Golden Raspberry wins.',
  })
  @ApiOkResponse({
    description: 'List of producers with minimum and maximum award win intervals',
    schema: {
      example: {
        min: [
          {
            "producer": "Producer 1",
            "interval": 1,
            "previousWin": 2008,
            "followingWin": 2009
          },

        ],
        max: [
          {
            "producer": "Producer 1",
            "interval": 99,
            "previousWin": 1900,
            "followingWin": 1999
          },
        ]
      }
    }
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseInterceptors(CacheInterceptor)
  @Get('/award-intervals')
  async getAwardsResume() {
    return this.getAwardIntervalsUseCase.execute();
  }
}
