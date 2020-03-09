import React, { useContext, useMemo } from 'react';
import { Paper } from '@material-ui/core';
import styled from 'styled-components';
import CalculationTable from './CalculationTable';
import CalculationBar from './CalculationBar';
import CalculationChart from './CalculationChart';
import { Context } from '../../Store';

const Container = styled(Paper)`
  padding: 20px;
`;

const CalculationPage: React.FC = () => {
  const [state] = useContext(Context);

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
