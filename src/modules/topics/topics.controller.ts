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
import { TopicsService } from './topics.service';
// DTO
import { TopicDto } from './dto/topic.dto';
import { TopicIdDto } from './dto/topic-id.dto';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  async findAll(): Promise<TopicIdDto[]> {
    return (await this.topicsService.findAll()) as TopicIdDto[];
  }

  @Get(':id')
  async findOneById(@Param() params): Promise<TopicIdDto> {
    return await this.topicsService.findById(params.id);
  }

  @Post()
  async create(@Body() topic: TopicDto): Promise<TopicDto> {
    return (await this.topicsService.insert(topic)) as TopicDto;
  }

  @Put(':id')
  async update(
    @Body() updatedTopic: TopicDto,
    @Param() params,
  ): Promise<TopicIdDto> {
    const oldTopic = await this.topicsService.findById(params.id);
    return await this.topicsService.update(oldTopic, updatedTopic);
  }

  @Delete(':id')
  async delete(@Param() params) {
    return await this.topicsService.delete(params.id);
  }
}
