import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
// Controller
import { TopicsController } from './topics.controller';
// Service
import { TopicsService } from './topics.service';
// Entity
import { Topics } from './entity/topics.entity';
import { CommentsModule } from '../comments/comments.module';
import { LikesModule } from '../likes/likes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topics]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CommentsModule,
    LikesModule,
  ],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule {}
