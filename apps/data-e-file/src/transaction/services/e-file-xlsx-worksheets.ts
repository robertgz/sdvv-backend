export interface XLSXWorksheetList {
  sheetName: string;
  formType: string;
  type: string;
}

export const CALWorksheets: XLSXWorksheetList[] = [
  {
    sheetName: 'F460-A-Contribs',
    formType: 'A',
    type: 'rcpt',
  },
  {
    sheetName: 'F460-C-Contribs',
    formType: 'C',
    type: 'rcpt',
  },
  {
    sheetName: 'F460-I-MiscCashIncs',
    formType: 'I',
    type: 'rcpt',
  },
  {
    sheetName: 'F496-P3-Contribs',
    formType: 'F496P3',
    type: 'rcpt',
  },
  {
    sheetName: 'F460-D-ContribIndepExpn',
    formType: 'D',
    type: 'expn',
  },
  {
    sheetName: 'F460-E-Expenditures',
    formType: 'E',
    type: 'expn',
  },
  {
    sheetName: 'F460-G-AgentPayments',
    formType: 'G',
    type: 'expn',
  },
];
