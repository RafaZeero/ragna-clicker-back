import { Module } from '@nestjs/common';
import { MonsterService } from './monster.service';
import { MonsterController } from './monster.controller';

@Module({
  controllers: [MonsterController],
  providers: [MonsterService],
})
export class MonsterModule {}
