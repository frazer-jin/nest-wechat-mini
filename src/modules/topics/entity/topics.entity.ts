import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Topics {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int' })
  user_id: number;

  @UpdateDateColumn()
  update_time: Date;

  @CreateDateColumn()
  create_time: Date;
}
