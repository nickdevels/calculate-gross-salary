export interface TableDataRow {
  month: string;
  gross: number;
  socialSecurityFee: number;
  unemploymentFee: number;
  incomeTaxAssesment: number;
  cumulativeIncomeTaxAssesment: number;
  incomeTax: number;
  stampFee: number;
  net: number;
}

export interface ChartData {
  socialSecurityFee: number;
  unemploymentFee: number;
  incomeTax: number;
  stampFee: number;
  netSalary: number;
}

export interface CalculatedSalaryData {
  chartData: ChartData;
  tableData: TableDataRow[];
}

export interface IncomeTaxRateRange {
  from: number;
  to?: number;
  rate: number;
}
