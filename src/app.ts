import { Module, } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

/* modules */
import { MatchesModule } from './controllers/matches/matches.module';

@Module({
  imports: [MatchesModule]
})
class AppModule {}

const app = await NestFactory.create(AppModule);

app.setGlobalPrefix(process.env.API_BASE_PATH)

app.use(helmet());

app.use(loggerMiddleware());