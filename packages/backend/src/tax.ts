import { BigNumber } from 'bignumber.js';
import { CalculatedSalaryData, IncomeTaxRateRange, TableDataRow } from '@salary/common';

export const incomeTaxPlan: IncomeTaxRateRange[] = [
  { from: 0, to: 18000, rate: 0.15 },
  { from: 18000, to: 40000, rate: 0.2 },
  { from: 40000, to: 148000, rate: 0.27 },
  { from: 148000, rate: 0.35 },
];

const minOf = (a: number, b: number): number => (a > b ? b : a);
const maxOf = (a: number, b: number): number => (a > b ? a : b);

const getTaxRangeBase = (income: number, { from, to }: IncomeTaxRateRange): number => {
  const incomeMinusFrom = new BigNumber(income).minus(from).toNumber();
  if (to === undefined) {
    return incomeMinusFrom;
  }
  return minOf(incomeMinusFrom, to);
};

export const calculateIncomeTax = (
  cita: number,
  income: number,
  plan: IncomeTaxRateRange[],
): number => {
  const preparedPlan = plan
    .map(({ from, to, rate }: IncomeTaxRateRange) => ({
      from: maxOf(from - cita, 0),
      to: to ? to - cita : to,
      rate,
    }))
    .filter(({ to }) => to === undefined || to > 0);
  return preparedPlan.reduce<number>((acc, range) => {
    if (income > range.from) {
      const base = getTaxRangeBase(income, range);
      return new BigNumber(acc).plus(new BigNumber(base).times(range.rate)).toNumber();
    }
    return acc;
  }, 0);
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface TaxCalculationIterationData {
  taxesByMonths: TableDataRow[];
  previousMonth?: TableDataRow;
}

const socialSecurityRate = 0.14;
const unemploymentRate = 0.01;
const stampFeeRate = 0.00759;

const SSTARangeMin = 2029.5;
const SSTARangeMax = 15221.5;

const calculateSSTA = (gross: number): number => maxOf(minOf(gross, SSTARangeMax), SSTARangeMin);

export const calculateNetSalary = (gross: number): CalculatedSalaryData => {
  const { taxesByMonths } = months.reduce<TaxCalculationIterationData>(
    ({ taxesByMonths, previousMonth }, month) => {
      const ssta = calculateSSTA(gross);
      const socialSecurityFee = new BigNumber(ssta).times(socialSecurityRate).toNumber();
      const unemploymentFee = new BigNumber(ssta).times(unemploymentRate).toNumber();
      const grossMoney = new BigNumber(gross);
      const incomeTaxAssesment = grossMoney
        .minus(new BigNumber(socialSecurityFee).plus(new BigNumber(unemploymentFee)))
        .toNumber();
      const stampFee = grossMoney.times(stampFeeRate).toNumber();

      const prevMonthCita = previousMonth?.cumulativeIncomeTaxAssesment ?? 0;

      const cumulativeIncomeTaxAssesment = new BigNumber(prevMonthCita)
        .plus(incomeTaxAssesment)
        .toNumber();

      const incomeTax = calculateIncomeTax(prevMonthCita, incomeTaxAssesment, incomeTaxPlan);
      const net = grossMoney
        .minus(socialSecurityFee)
        .minus(unemploymentFee)
        .minus(stampFee)
        .minus(incomeTax)
        .toNumber();

      const currentMonth: TableDataRow = {
        month,
        gross,
        socialSecurityFee,
        unemploymentFee,
        stampFee,
        incomeTaxAssesment,
        cumulativeIncomeTaxAssesment,
        incomeTax,
        net,
      };

      return {
        taxesByMonths: [...taxesByMonths, currentMonth],
        previousMonth: currentMonth,
      };
    },
    { taxesByMonths: [] as TableDataRow[] },
  );

  const totalRow = taxesByMonths.reduce((acc: TableDataRow | null, row) => {
    if (!acc) {
      return { ...row };
    }
    return {
      month: 'Total',
      gross: new BigNumber(acc.gross).plus(row.gross).toNumber(),
      socialSecurityFee: new BigNumber(acc.socialSecurityFee)
        .plus(row.socialSecurityFee)
        .toNumber(),
      unemploymentFee: new BigNumber(acc.unemploymentFee).plus(row.unemploymentFee).toNumber(),
      incomeTaxAssesment: new BigNumber(acc.incomeTaxAssesment)
        .plus(row.incomeTaxAssesment)
        .toNumber(),
      cumulativeIncomeTaxAssesment: new BigNumber(acc.cumulativeIncomeTaxAssesment)
        .plus(row.cumulativeIncomeTaxAssesment)
        .toNumber(),
      incomeTax: new BigNumber(acc.incomeTax).plus(row.incomeTax).toNumber(),
      stampFee: new BigNumber(acc.stampFee).plus(row.stampFee).toNumber(),
      net: new BigNumber(acc.net).plus(row.net).toNumber(),
    };
  });

  return {
    tableData: [...taxesByMonths, totalRow],
    chartData: {
      socialSecurityFee: totalRow.socialSecurityFee,
      unemploymentFee: totalRow.unemploymentFee,
      incomeTax: totalRow.incomeTax,
      stampFee: totalRow.stampFee,
      netSalary: totalRow.net,
    },
  };
};
