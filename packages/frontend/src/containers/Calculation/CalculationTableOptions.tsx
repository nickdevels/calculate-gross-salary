import React from 'react';
import { MUIDataTableOptions } from 'mui-datatables';

export const CalculationTableOptions = (): MUIDataTableOptions => {
  return {
    filterType: 'checkbox',
    search: true,
    print: false,
    download: false,
    filter: true,
    viewColumns: false,
    selectableRows: 'none',
    customToolbarSelect: React.Fragment,
    responsive: 'stacked',
    rowsPerPage: 100,
    rowsPerPageOptions: [100],
  } as MUIDataTableOptions;
};
