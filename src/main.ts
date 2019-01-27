/* node_modules */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as cors from 'cors';

/* app */
import { AppModule } from './app';

/* middleware */
import { loggerMiddleware } from './middleware/logger/logger.middleware';

/* libraries */
import mongo from './lib/mongo';

async function bootstrap() {
  try {
    const [ app ] = await Promise.all(
      [NestFactory.create(AppModule), mongo.init(process.env.NODE_ENV === 'LOCAL' ? 'src/configs/datasources' : 'configs/datasources')]
    );

    app.setGlobalPrefix(process.env.API_BASE_PATH)
  
    app.use(helmet());
    app.use(cors({
      optionsSuccessStatus: 200
    }));
    app.use(loggerMiddleware());
  
    const options = new DocumentBuilder()
      .setTitle('Todo API')
      .setDescription('API housing functionalities around todos')
      .setVersion('1.0')
      .setBasePath(process.env.API_BASE_PATH)
      .build();
  
    const document = SwaggerModule.createDocument(app, options);
    
    SwaggerModule.setup(`${process.env.API_BASE_PATH}/docs`, app, document);
  
    await app.listen(3001);  
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

bootstrap();
