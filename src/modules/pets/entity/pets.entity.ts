import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pets {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 32, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 8, nullable: false })
  gender: string;

  @Column({ type: 'text' })
  avatar: string;

  @Column({ type: 'date' })
  birthday: string;

  @Column({ type: 'tinyint' })
  vaccines: boolean;

  @Column({ type: 'tinyint' })
  sterilization: boolean;

  @Column({ type: 'int' })
  user_id: number;

  @UpdateDateColumn()
  update_time: Date;

  @CreateDateColumn()
  create_time: Date;
}
