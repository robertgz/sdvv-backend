import { Exclude, Expose } from 'class-transformer';
import { Matches, IsString } from 'class-validator';

@Exclude()
export class CreateContributionTransactionDto {
  @Expose({ name: 'agencyShortcut' })
  @IsString()
  agency_shortcut: string;

  @Expose({ name: 'filerId' })
  @IsString()
  filer_id: string;

  @Expose({ name: 'reportNumber' })
  @IsString()
  report_number: string;

  @Expose({ name: 'reportDate' })
  @IsString()
  report_date: string;

  @Expose({ name: 'recType' })
  @IsString()
  record_type: string;

  @Expose({ name: 'formType' })
  @IsString()
  form_type: string;

  // @Expose({ name: 'election_date' })
  // @Matches(/^\d{2}\/\d{2}\/\d{4}$/)
  // date: string;

  // @Expose({ name: 'election_type' })
  // @IsString()
  // type: string;

  // // agencyId: string;

  // @Exclude({ toClassOnly: true })
  // election_id: string;
}
