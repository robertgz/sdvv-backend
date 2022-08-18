import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'candidate', schema: 'multi_source' })
export class CandidateEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  full_name: string;

  @Column()
  full_office_name: string;

  @Column()
  election_id: string;

  @Column({ nullable: true })
  candidate_info_id: string;

  @Column({ nullable: true })
  filer_id: string;

  @Column({ nullable: true })
  candidate_controlled_committee_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
