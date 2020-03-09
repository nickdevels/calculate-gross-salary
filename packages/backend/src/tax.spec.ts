import { calculateIncomeTax, incomeTaxPlan } from './tax';
describe('Income tax calculation', () => {
  it('should use first range if CITA=0', () => {
    const cita = 0;
    const income = 10000;

    const result = calculateIncomeTax(cita, income, incomeTaxPlan);

    expect(result).toEqual(1500);
  });

  it('should use second range if CITA=end_of_first_range', () => {
    const cita = 18000;
    const income = 10000;

    const result = calculateIncomeTax(cita, income, incomeTaxPlan);

    expect(result).toEqual(2000);
  });
});
