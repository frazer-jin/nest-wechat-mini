import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 128 })
  @Index('idx_open_id', { unique: true })
  open_id: string;

  @Column({ type: 'varchar', nullable: true, length: 128 })
  @Index('idx_union_id', { unique: true })
  union_id: string;

  @Column({ type: 'varchar', nullable: true })
  session_key: string;

  @Column({ type: 'varchar', nullable: true })
  nick_name: string;

  @Column({ type: 'varchar', nullable: true, length: 1024 })
  avatar_url: string;

  @Column({ type: 'int', nullable: true })
  gender: number;

  @Column({ type: 'varchar', nullable: true })
  country: string;

  @Column({ type: 'varchar', nullable: true })
  province: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @UpdateDateColumn()
  update_time: Date;

  @CreateDateColumn()
  create_time: Date;
}
