import { INestApplication, ValidationPipe, VersioningType } from "@nestjs/common";
import { AppModule } from "./app.module";
import { EnviromentService } from "@common/enviroment";
import { LoggerService } from "@common/logger";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


export class Application {
  private server: INestApplication<AppModule>;
  private enviromentService: EnviromentService;
  private loggerService: LoggerService;
  private readonly prefix: string = "api";

  get app(): INestApplication<AppModule> {
    return this.server;
  }

  async start(): Promise<void> {
    await this.setupApplication();
    await this.setGlobalScopes();
    await this.configSwagger();

    const port = this.enviromentService.get("APP_PORT");

    await this.server.listen(port).catch((error) => {
      this.loggerService.error(`Failed to start server on port ${port} - ${error.message}`);
      this.server.close();
    });

    this.loggerService.log(`Server is running on port ${port}`);
  }

   async setupApplication(): Promise<void> {
    this.server = await NestFactory.create(AppModule);
    this.enviromentService = this.server.get(EnviromentService);
    this.loggerService = this.server.get(LoggerService);

    this.loggerService.context = Application.name;
  }

  async setGlobalScopes(): Promise<void> {
    this.server.setGlobalPrefix(this.prefix);

    this.server.enableCors({
      origin: '*',
      credentials: true,
    });

    this.server.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    this.server.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        disableErrorMessages: this.enviromentService.get("NODE_ENV") === "production",
      })
    );

    this.server.useLogger(this.loggerService);
  }

  private async configSwagger(): Promise<void> {
    const nodeEnv = this.enviromentService.get('NODE_ENV');

    if (nodeEnv !== 'development') {
      return;
    }

    const config = new DocumentBuilder()
      .setTitle('Golden Raspberry Awards Api')
      .setDescription('API documentation for Golden Raspberry Awards application')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(this.server, config);
    SwaggerModule.setup('api-docs', this.server, document);
  }

}