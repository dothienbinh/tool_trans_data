import { Module } from '@nestjs/common';
import { KafkaConsumer } from './kafka.consumer';
import { NormalizerService } from '../normalizer/normalizer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [KafkaConsumer, NormalizerService],
  exports: [KafkaConsumer],
})
export class KafkaModule {}
