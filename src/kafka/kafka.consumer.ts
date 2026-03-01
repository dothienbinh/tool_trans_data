import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { NormalizerService } from '../normalizer/normalizer.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaConsumer implements OnModuleDestroy {
  private kafka = new Kafka({
    clientId: this.configService.get('KAFKA_CLIENT_ID'),
    brokers: [this.configService.get('KAFKA_BROKERS')],
  });

  private consumer = this.kafka.consumer({
    groupId: this.configService.get('KAFKA_GROUP_ID'),
  });

  constructor(
    private normalizer: NormalizerService,
    private configService: ConfigService,
  ) {}

  async start() {
    try {
      await this.consumer.connect();

      await this.consumer.subscribe({
        topic: this.configService.get('KAFKA_TOPIC'),
        fromBeginning:
          this.configService.get('KAFKA_FROM_BEGINNING') === 'true',
      });

      await this.consumer.run({
        eachMessage: async ({ topic, message }) => {
          console.log('llllllllllll', topic);
          console.log();
          const value = message.value?.toString();
          if (!value) return;

          const parsed = JSON.parse(value);

          await this.normalizer.handle(topic, parsed);
        },
      });
    } catch (err) {
      console.error('Failed to start Kafka consumer:', err);
    }
  }

  async onModuleDestroy() {
    try {
      await this.consumer.disconnect();
    } catch (err) {
      console.warn('Error while disconnecting Kafka consumer:', err);
    }
  }
}
