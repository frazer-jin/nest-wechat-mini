import { TopicDto } from './topic.dto';

export class TopicIdDto extends TopicDto {
  readonly id: number;
  readonly comments_count: number;
  readonly likes_count: number;
}
