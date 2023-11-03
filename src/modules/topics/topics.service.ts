import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entity
import { Topics } from './entity/topics.entity';
// DTO
import { TopicDto } from './dto/topic.dto';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topics)
    private readonly topicRepository: Repository<Topics>,
  ) {}

  async findAll(): Promise<Topics[]> {
    try {
      return await this.topicRepository.find({});
    } catch (err) {
      return err;
    }
  }

  async findById(id: string): Promise<Topics> {
    try {
      return await this.topicRepository.findOneById(id);
    } catch (err) {
      return err;
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
      return err;
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
      return err;
    }
  }

  async delete(id: string) {
    try {
      return await this.topicRepository.delete(id);
    } catch (err) {
      return err;
    }
  }
}
