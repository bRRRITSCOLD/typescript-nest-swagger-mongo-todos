/* node_modules */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

/* app */
import { AppModule } from './app';

/* middleware */
import { loggerMiddleware } from './middleware/logger/logger.middleware';

process.env.NODE_ENV = 'LOCAL';
process.env.API_BASE_PATH = 'hltv-api/v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.API_BASE_PATH)

  app.use(helmet());
  
  app.use(loggerMiddleware());

  const options = new DocumentBuilder()
    .setTitle('HLTV API')
    .setDescription('HLTV API housing functionality around hltv.com and the data from said site')
    .setVersion('1.0')
    .setBasePath(process.env.API_BASE_PATH)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  
  SwaggerModule.setup(`${process.env.API_BASE_PATH}/docs`, app, document);

  await app.listen(3000);
}

bootstrap();
