import React, { useMemo, useContext } from 'react';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import { CalculationTableOptions } from './CalculationTableOptions';
import { columnsNames } from './constants';
import { Context } from '../../Store';
import CalculationCard from './CalculationCard';

const CalculationTable: React.FC = () => {
  const [state] = useContext(Context);

  const columns = columnsNames;

  const { tableData } = state.salaryMonths ?? {};

  const options: MUIDataTableOptions = useMemo(() => CalculationTableOptions(), []);

  if (!state.salaryMonths || !tableData) {
    return <CalculationCard />;
  }

  return (
    <MUIDataTable title={'Calculation'} data={tableData} columns={columns} options={options} />
  );
};

export default CalculationTable;
