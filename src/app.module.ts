import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AppRedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KafkaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'student_db',
      autoLoadEntities: true,
      synchronize: false,
    }),
    AppRedisModule,
    TypeOrmModule.forFeature([User]),
  ],
})
export class AppModule {}
