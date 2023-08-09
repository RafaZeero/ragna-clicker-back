import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MonsterModule } from './monster/monster.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [MonsterModule, PlayerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
