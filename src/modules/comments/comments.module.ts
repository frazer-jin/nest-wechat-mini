import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Controller
import { CommentsController } from './comments.controller';
// Service
import { CommentsService } from './comments.service';
// Entity
import { Comments } from './entity/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comments])],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
