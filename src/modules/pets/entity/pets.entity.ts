import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'timestamp', update: true })
  update_time: number;

  @Column({ type: 'timestamp', update: false })
  create_time: number;
}
