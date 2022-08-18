import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'year' })
export class YearEntity {
  @PrimaryColumn()
  year: string; // Example: '2020', '2022'

  @PrimaryColumn()
  agency_id: string;

  data_last_updated: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
