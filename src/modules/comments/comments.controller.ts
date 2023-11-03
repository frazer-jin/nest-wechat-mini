import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
// Service
import { CommentsService } from './comments.service';
// DTO
import { CommentDto } from './dto/comment.dto';
import { CommentIdDto } from './dto/comment-id.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll(): Promise<CommentIdDto[]> {
    return (await this.commentsService.findAll()) as CommentIdDto[];
  }

  @Get(':id')
  async findOneById(@Param() params): Promise<CommentIdDto> {
    return await this.commentsService.findById(params.id);
  }

  @Post()
  async create(@Body() comment: CommentDto): Promise<CommentDto> {
    return (await this.commentsService.insert(comment)) as CommentDto;
  }

  @Put(':id')
  async update(
    @Body() updatedComment: CommentDto,
    @Param() params,
  ): Promise<CommentIdDto> {
    const oldComment = await this.commentsService.findById(params.id);
    return await this.commentsService.update(oldComment, updatedComment);
  }

  @Delete(':id')
  async delete(@Param() params) {
    return await this.commentsService.delete(params.id);
  }
}
