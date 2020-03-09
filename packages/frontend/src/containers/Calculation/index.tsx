import React, { useMemo } from 'react';
import { Paper } from '@material-ui/core';
import styled from 'styled-components';
import CalculationTable from './CalculationTable';
import CalculationBar from './CalculationBar';
import CalculationChart from './CalculationChart';

const Container = styled(Paper)`
  padding: 20px;
`;

const CalculationPage: React.FC = () => {
  const stylePadding = useMemo(() => ({ padding: '10px' }), []);
  return (
    <>
      <Container variant="outlined">
        <CalculationBar />
      </Container>
      <div style={stylePadding}>
        <CalculationTable />
      </div>
      <div style={stylePadding}>
        <CalculationChart />
      </div>
    </>
  );
};

export default CalculationPage;
