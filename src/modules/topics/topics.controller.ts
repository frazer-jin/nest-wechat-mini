import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// Service
import { TopicsService } from './topics.service';
// DTO
import { TopicDto } from './dto/topic.dto';
import { TopicIdDto } from './dto/topic-id.dto';
import { CommentsService } from '../comments/comments.service';
import { LikesService } from '../likes/likes.service';
import { LikeDto } from '../likes/dto/like.dto';
import { UsersService } from '../users/users.service';
import { CommentIdDto } from '../comments/dto/comment-id.dto';

@Controller('topics')
export class TopicsController {
  constructor(
    private readonly topicsService: TopicsService,
    private readonly commentsService: CommentsService,
    private readonly likesService: LikesService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @UseGuards(AuthGuard())
  async findAll(@Request() req): Promise<TopicIdDto[]> {
    const user_id = req.user.user_id;
    const topics = await this.topicsService.findAll();
    for (const t of topics) {
      // comment count
      const comment_count = await this.commentsService.findCountByTopicId(t.id);
      // like count
      const liked_user = await this.likesService.findLikedUsersByTopicId(t.id);
      const like_count = liked_user.length;
      let liked = false;
      if (liked_user.includes(user_id)) {
        liked = true;
      }

      // user
      const user = await this.usersService.findById(t.user_id);
      const user_avatar_url = user?.avatar_url;
      Object.assign(t, { like_count, comment_count, user_avatar_url, liked });
    }
    return topics as TopicIdDto[];
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOneById(@Request() req, @Param() params): Promise<TopicIdDto> {
    const user_id = req.user.user_id;
    const topic = await this.topicsService.findById(params.id);
    // comment count
    const comment_count = await this.commentsService.findCountByTopicId(
      params.id,
    );
    // like count
    const liked_user = await this.likesService.findLikedUsersByTopicId(
      params.id,
    );
    const like_count = liked_user.length;
    let liked = false;
    if (liked_user.includes(user_id)) {
      liked = true;
    }
    // user
    const user = await this.usersService.findById(topic.user_id);
    const user_avatar_url = user?.avatar_url;
    Object.assign(topic, { like_count, comment_count, user_avatar_url, liked });
    return topic as TopicIdDto;
  }

  @Get(':id/comments')
  async findComments(@Param() params): Promise<CommentIdDto[]> {
    // comment
    const comments = await this.commentsService.findByTopicId(params.id);
    return comments as CommentIdDto[];
  }

  @Put(':id/like')
  @UseGuards(AuthGuard())
  async toggleTopicLike(@Request() req, @Param() params): Promise<TopicIdDto> {
    const user_id = req.user.user_id;
    const topic_id = params.id;
    const topic = await this.topicsService.findById(topic_id);
    const like = await this.likesService.findByTopicIdUserId(topic_id, user_id);
    if (like) {
      await this.likesService.delete(like.id);
    } else {
      const likeDto = { topic_id, user_id } as LikeDto;
      await this.likesService.insert(likeDto);
    }
    // comment count
    const comment_count = await this.commentsService.findCountByTopicId(
      params.id,
    );
    // like count
    const liked_user = await this.likesService.findLikedUsersByTopicId(
      params.id,
    );
    const like_count = liked_user.length;
    let liked = false;
    if (liked_user.includes(user_id)) {
      liked = true;
    }
    // user
    const user = await this.usersService.findById(topic.user_id);
    const user_avatar_url = user?.avatar_url;
    Object.assign(topic, { like_count, comment_count, user_avatar_url, liked });
    return topic as TopicIdDto;
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Request() req, @Body() topic: TopicDto): Promise<TopicDto> {
    topic.user_id = req.user.user_id;
    return (await this.topicsService.insert(topic)) as TopicDto;
  }

  @Put(':id')
  async update(
    @Body() updatedTopic: TopicDto,
    @Param() params,
  ): Promise<TopicIdDto> {
    const oldTopic = await this.topicsService.findById(params.id);
    return (await this.topicsService.update(
      oldTopic,
      updatedTopic,
    )) as TopicIdDto;
  }

  @Delete(':id')
  async delete(@Param() params) {
    return await this.topicsService.delete(params.id);
  }
}
