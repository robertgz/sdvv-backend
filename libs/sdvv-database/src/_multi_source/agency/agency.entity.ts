import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'agency', schema: 'multi_source' })
export class AgencyEntity {
  // MD5 of lower case name
  @PrimaryColumn()
  id: string; // Example: '6ad4f21a49427ce65d7e34edd3d4e2f8'

  @Column()
  shortcut: string; // Abbreviated Agency name, Example: CSD, CCV

  @Column()
  name: string; // Example: 'San Diego, City of'

  @Column()
  source: string; // Data source, Example: SDEFILE, NETFILE

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
