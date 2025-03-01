import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config(); // .env 파일 로드

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000); // 환경 변수에서 PORT 값을 사용하거나 기본값 3000을 사용
}
bootstrap();
