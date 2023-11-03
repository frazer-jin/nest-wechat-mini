import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int' })
  topic_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @UpdateDateColumn()
  update_time: Date;

  @CreateDateColumn()
  create_time: Date;
}
