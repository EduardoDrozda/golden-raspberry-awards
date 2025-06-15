import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { App } from "supertest/types";
import request from "supertest";

describe("ProducerController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /producers/award-intervals should return intervals about Golden Raspberry', () => {
    return request(app.getHttpServer())
      .get('/producers/award-intervals')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('min');
        expect(res.body).toHaveProperty('max');
        expect(Array.isArray(res.body.min)).toBe(true);
        expect(Array.isArray(res.body.max)).toBe(true);
        expect(res.body.min.length).toBeGreaterThan(0);
        expect(res.body.max.length).toBeGreaterThan(0);
      });
  });
});