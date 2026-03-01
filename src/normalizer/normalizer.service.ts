import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class NormalizerService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async handle(topic: string, event: any) {
    if (!event?.payload?.after) return;
    const data = this.normalizeStudent(event.payload);
    console.log('Normalized user:', data);

    const test = await this.userRepo.create({
      name: data.name,
      action: data.action,
      before: data.before,
      after: data.after,
    });
    await this.userRepo.save(test);
    console.log('Saved user:', test);
  }

  private normalizeStudent(raw: any) {
    return {
      name: 'dothienbinh',
      action: raw.op,
      before: JSON.stringify(raw.before),
      after: JSON.stringify(raw.after),
    };
  }
}
