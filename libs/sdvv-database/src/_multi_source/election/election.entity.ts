import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'election', schema: 'multi_source' })
export class ElectionEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  election_date: string;

  @Column()
  election_type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
