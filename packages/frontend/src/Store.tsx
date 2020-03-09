import React, { createContext, Dispatch, useReducer } from 'react';
import Reducer, { DataAction, ErrorAction } from './reducer';
import { CalculatedSalaryData } from '@salary/common';

export interface StateValues {
  salaryMonths: CalculatedSalaryData | null;
  error: string | null;
}

const initialState: StateValues = {
  salaryMonths: null,
  error: null,
};

const noop = (): void => undefined;

type ContextValues = [StateValues, Dispatch<DataAction | ErrorAction>];

export const Context = createContext<ContextValues>([initialState, noop]);

export const Store: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};
