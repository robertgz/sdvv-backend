import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class EFileCandidate {
  @Expose({ name: 'candidate_name' })
  @IsString()
  name: string;

  @Expose({ name: 'full_office_name' })
  @IsString()
  office: string;
}
