import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Controller
import { TopicsController } from './topics.controller';
// Service
import { TopicsService } from './topics.service';
// Entity
import { Topics } from './entity/topics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topics])],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule {}
