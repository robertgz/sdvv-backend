import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
/**
 * This table is for transactions of type contribution which have rec_type of RCPT.
 * The transactions are from sheets: F460-A-Contribs, F460-C-Contribs,
 * F460-I-MiscCashIncs, and F496-P3-Contribs.
 */
// @Entity({ name: 'contribution', schema: 'multi_source' })
@Entity({ name: 'contributions', schema: 'multi_source' })
export class ContributionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  agency_shortcut: string;
  /**
   * agency_shortcut
   * Example: CSD, CCV
   */

  @Column()
  filer_id: string;
  /**
   * filer_id
   * Example: 1234567
   */

  @Column()
  filer_name: string;

  @Column()
  report_number: string;
  /**
   * report_number
   * Examples: 000, 001, 003
   */

  @Column()
  filing_id: string; // remove
  /**
   * filing_id
   * Example: 123456789
   */

  // // @Column()
  // // orig_e_filing_id: string;

  @Column({ nullable: true })
  cmtte_type: string;
  /**
   * Type of Recipient Committee  (Req on F450 & F460)
   * Value:
   * C = Cand/Officeholder Controlled Cmtte [460]
   * P = Cand/Officeholder Primarily Formed [450|460]
   * B = Ballot Measure Committee [450|460]
   * G = General Purpose Committee [450|460]
   */

  @Column({ type: 'date' })
  report_date: string;
  /**
   * report_date
   * Examples: 2005-01-01
   * Format: YYY-MM-DD
   */

  // @Column({ nullable: true })
  // from_date: string;

  // @Column({ nullable: true })
  // thru_date: string;

  // @Column({ nullable: true })
  // elect_date: string;

  @Column()
  record_type: string;
  /**
   * record_type
   * Example: RCPT
   */

  @Column()
  form_type: string;
  /**
   * Values for form_type: A, C, I, F496P3
   * A: Schedule A Monetary Contributions Received
   * C: Schedule C - Nonmonetary Contributions Received
   * I: Schedule I - Miscellaneous Increases to Cash
   * F496P3: Contributions of $100 or More Received
   */

  // @Column()
  // tran_id: string;

  // @Column()
  // entity_cd: string;
  // /**
  //  * Values: [COM|RCP] - Recipient Committee
  //  * IND - Individual;
  //  * OTH - Other (e.g. a Bus, Cmtte, Org, ...)
  //  * PTY - Political Party; (F496P3 & F460)
  //  * SCC - Small Contributor Committee (F496P3 & F460)
  //  */

  // @Column()
  // ctrib_naml: string;

  // @Column({ nullable: true })
  // ctrib_namf: string;

  // @Column({ nullable: true })
  // ctrib_namt: string;

  // @Column({ nullable: true })
  // ctrib_nams: string;

  // @Column({ nullable: true })
  // ctrib_adr1: string;

  // @Column({ nullable: true })
  // ctrib_adr2: string;

  // @Column({ nullable: true })
  // ctrib_city: string;

  // @Column({ nullable: true })
  // ctrib_st: string;

  // @Column({ nullable: true })
  // ctrib_zip4: string;

  // @Column({ nullable: true })
  // ctrib_emp: string;

  // @Column({ nullable: true })
  // ctrib_occ: string;

  // @Column()
  // ctrib_self: boolean;
  // /**
  //  * Self Employed?
  //  */

  // @Column({ nullable: true })
  // tran_type: string;
  // /**
  //  * Transaction Type - Values:
  //  * F = Forgiven Loan;
  //  * I = Intermediary;
  //  * R = Returned (Negative Amount?);
  //  * T = Third Party Repayment;
  //  * X = Transfer
  //  */

  // @Column()
  // rcpt_date: string;

  // @Column({ nullable: true })
  // date_thru: string;

  // @Column({ type: 'numeric' })
  // amount: number;

  // @Column({ type: 'numeric', nullable: true })
  // cum_ytd: number;

  // @Column({ nullable: true })
  // ctrib_dscr: string;

  // @Column({ nullable: true })
  // cmte_id: string;

  // @Column({ nullable: true })
  // tres_naml: string;

  // @Column({ nullable: true })
  // tres_namf: string;

  // @Column({ nullable: true })
  // tres_namt: string;

  // @Column({ nullable: true })
  // tres_nams: string;

  // @Column({ nullable: true })
  // tres_adr1: string;

  // @Column({ nullable: true })
  // tres_adr2: string;

  // @Column({ nullable: true })
  // tres_city: string;

  // @Column({ nullable: true })
  // tres_st: string;

  // @Column({ nullable: true })
  // tres_zip4: string;

  // @Column({ nullable: true })
  // intr_naml: string;

  // @Column({ nullable: true })
  // intr_namf: string;

  // @Column({ nullable: true })
  // intr_namt: string;

  // @Column({ nullable: true })
  // intr_nams: string;

  // @Column({ nullable: true })
  // intr_adr1: string;

  // @Column({ nullable: true })
  // intr_adr2: string;

  // @Column({ nullable: true })
  // intr_city: string;

  // @Column({ nullable: true })
  // intr_st: string;

  // @Column({ nullable: true })
  // intr_zip4: string;

  // @Column({ nullable: true })
  // intr_emp: string;

  // @Column({ nullable: true })
  // intr_occ: string;

  // @Column()
  // intr_self: boolean;

  // @Column()
  // memo_code: boolean;

  // @Column({ nullable: true })
  // memo_refno: string;

  // @Column({ nullable: true })
  // bakref_tid: string;

  // @Column({ nullable: true })
  // xref_schnm: string;

  // @Column({ nullable: true })
  // xref_match: string;

  // @Column({ nullable: true })
  // int_rate: string;

  // @Column({ nullable: true })
  // int_cmteid: string;

  // // Added fields that are not in the XLSX file.
  // @Column()
  // xlsx_file_year: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
