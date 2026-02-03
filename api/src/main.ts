import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function bootstrap() {

  try {
    await prisma.$connect();
    console.log('✅ Connected to database');
  } catch (err) {
    console.error('❌ Failed to connect to database', err);
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
