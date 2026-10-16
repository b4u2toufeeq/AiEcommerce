import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await 
  NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new 
    ValidationPipe({ transform:true})
  )
  app.enableCors({origin: 'http://localhost:5173'});
  await app.listen(process.env.PORT ?? 3000);
}
 bootstrap();
