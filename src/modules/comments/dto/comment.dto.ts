export class CommentDto {
  readonly content: string;
  readonly topic_id: number;
  readonly user_id: number;
  readonly update_time: Date;
  readonly create_time: Date;
}
