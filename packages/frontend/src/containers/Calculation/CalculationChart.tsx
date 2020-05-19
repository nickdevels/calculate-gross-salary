import * as React from 'react';
import { Paper } from '@material-ui/core';
import { Chart, PieSeries, Legend, Title } from '@devexpress/dx-react-chart-material-ui';
import {
  EventTracker,
  HandlerFn,
  SelectionState,
  SeriesRef,
  TargetList,
} from '@devexpress/dx-react-chart';
import { useState, useCallback, useContext, useMemo } from 'react';
import { Context } from '../../Store';
import { ChartData } from '@salary/common';

interface ChartSeries {
  name: string;
  field: keyof ChartData;
}

const series: ChartSeries[] = [
  { name: 'Social security fee', field: 'socialSecurityFee' },
  { name: 'Unemployment fee', field: 'unemploymentFee' },
  { name: 'Income tax', field: 'incomeTax' },
  { name: 'Stamp fee', field: 'stampFee' },
  { name: 'Net salary', field: 'netSalary' },
];

const CalculationChart: React.FC = () => {
  const [state] = useContext(Context);

  const { chartData } = state.salaryMonths ?? {};
  const data = useMemo(
    () => series.map(({ name, field }) => ({ name, value: chartData?.[field] })),
    [chartData],
  );
  const [selection, setSelection] = useState<TargetList>([]);

  const compare = (
    { series, point }: SeriesRef,
    { series: targetSeries, point: targetPoint }: SeriesRef,
  ): boolean => series === targetSeries && point === targetPoint;

  const showValue = useCallback<HandlerFn>(({ targets }) => {
    const target = targets[0];
    if (target) {
      setSelection((selection) => (selection[0] && compare(selection[0], target) ? [] : [target]));
    }
  }, []);

  if (!state.salaryMonths) {
    return <></>;
  }

  return (
    <Paper>
      <Chart data={data}>
        <PieSeries argumentField="name" valueField="value" />
        <Title text="Here is your taxes and net salary in total (year)" />
        <Legend />
        <EventTracker onClick={showValue} />
        <SelectionState selection={selection} />
        <Title text={`Selected value: ${selection.length ? data[selection[0].point].value : ''}`} />
      </Chart>
    </Paper>
  );
};

export default CalculationChart;
