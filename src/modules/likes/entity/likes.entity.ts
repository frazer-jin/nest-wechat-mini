import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Index('idx_topic_user', ['topic_id', 'user_id'], { unique: true })
export class Likes {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  topic_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @UpdateDateColumn()
  update_time: Date;

  @CreateDateColumn()
  create_time: Date;
}
