import { CalculatedSalaryData, StateValues } from './Store';

interface Action<T = string, P = {}> {
  type: T;
  payload: P;
}

type DataAction = Action<'POST_SALARY', CalculatedSalaryData>;
type ErrorAction = Action<'SET_ERROR', string>;

const Reducer = (state: StateValues, action: DataAction | ErrorAction): StateValues => {
  switch (action.type) {
    case 'POST_SALARY':
      return {
        ...state,
        salaryMonths: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
