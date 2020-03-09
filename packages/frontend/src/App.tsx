import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import HomePage from './containers/HomePage/Loadable';
import CalculationPage from './containers/Calculation/Loadable';
import { Store } from './Store';

const App: React.FC = () => {
  return (
    <Store>
      <CssBaseline>
        <Switch>
          <Route component={HomePage} exact path="/" />
          <Route component={CalculationPage} path="/calculation" />
        </Switch>
      </CssBaseline>
    </Store>
  );
};

export default App;
