import { Exclude, Expose } from 'class-transformer';
import { Matches, IsString } from 'class-validator';

export class EFileElection {
  @Expose({ name: 'election_date' })
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/)
  date: string;

  @Expose({ name: 'election_type' })
  @IsString()
  type: string;

  // agencyId: string;

  @Exclude({ toClassOnly: true })
  election_id: string;

  @Exclude()
  internal: boolean;
}
