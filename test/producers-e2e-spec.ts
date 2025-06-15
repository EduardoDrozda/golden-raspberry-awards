import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { App } from "supertest/types";
import request from "supertest";
import { DatabaseInitService } from "@infrastructure/database/database-init.service";
import { GetAwardsResponseDto } from "@application/dtos/producers";

describe("ProducerController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('GET /producers/award-intervals should return intervals about Golden Raspberry with Joel Silver and Matthew Vaughn', async () => {
    const mockResponse: GetAwardsResponseDto = {
      min: [
        {
          producer: "Joel Silver",
          interval: 1,
          previousWin: 1990,
          followingWin: 1991
        }
      ],
      "max": [
        {
          producer: "Matthew Vaughn",
          interval: 13,
          previousWin: 2002,
          followingWin: 2015
        }
      ]
    }

    const result = await request(app.getHttpServer())
      .get('/producers/award-intervals')
      .expect(HttpStatus.OK);

    expect(result.body).toEqual(mockResponse);
    expect(result.body.min).toEqual(mockResponse.min);
    expect(result.body.max).toEqual(mockResponse.max);
  });
});