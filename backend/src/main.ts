import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Config that enables this frontend url to invoke this backend http methods
  // app.enableCors({
  //   origin: 'http://localhost:5173', // seu frontend
  //   methods: 'GET,POST,PUT,PATCH,DELETE',
  //   credentials: true,
  // });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

