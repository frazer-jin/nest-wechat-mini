import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entity
import { Topics } from './entity/topics.entity';
// DTO
import { TopicDto } from './dto/topic.dto';
import { DbException } from 'src/exceptions/DbException';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topics)
    private readonly topicRepository: Repository<Topics>,
  ) {}

  async findAll(page: number, limit: number): Promise<Topics[]> {
    try {
      const skip = (page - 1) * limit;
      return await this.topicRepository.find({
        skip,
        take: limit,
        order: {
          create_time: 'DESC',
        },
      });
    } catch (err) {
      throw new DbException(err);
    }
  }

  async findById(id: number): Promise<Topics> {
    try {
      return await this.topicRepository.findOneBy({ id: id });
    } catch (err) {
      throw new DbException(err);
    }
  }

  async insert(topic: TopicDto): Promise<Topics> {
    const newTopic = new Topics();

    Object.keys(topic).forEach((key) => {
      newTopic[key] = topic[key];
    });

    try {
      return await this.topicRepository.save(newTopic);
    } catch (err) {
      throw new DbException(err);
    }
  }

  async update(oldTopic: Topics, updated_values: TopicDto): Promise<Topics> {
    const updatedTopic = oldTopic;

    Object.keys(updated_values).forEach((key) => {
      updatedTopic[key] = updated_values[key];
    });

    try {
      return await this.topicRepository.save(updatedTopic);
    } catch (err) {
      throw new DbException(err);
    }
  }

  async delete(id: string) {
    try {
      return await this.topicRepository.delete(id);
    } catch (err) {
      throw new DbException(err);
    }
  }
}
