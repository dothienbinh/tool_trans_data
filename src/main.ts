import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaConsumer } from './kafka/kafka.consumer';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  console.log('✅ PostgreSQL connected');
  const consumer = app.get(KafkaConsumer);

  await consumer.start();
}
bootstrap();
