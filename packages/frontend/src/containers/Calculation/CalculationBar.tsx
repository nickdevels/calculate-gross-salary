import React, { useCallback, useState, useContext, useEffect } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { FieldError } from '../../components/FieldError';
import * as yup from 'yup';
import useAxios from '@use-hooks/axios';
import { useForm } from 'react-hook-form';
import { Context } from '../../Store';

const schema = yup.object().shape({
  grossSalary: yup
    .number()
    .typeError('You must specify a number')
    .required('Required')
    .positive('Should be positive'),
});

const CalculationBar: React.FC = () => {
  const [, dispatch] = useContext(Context);
  const [grossSalary, setSalary] = useState(0);
  const { response, loading } = useAxios({
    url: 'http://localhost:4040/api/calculate-tax',
    method: 'POST',
    options: {
      data: {
        grossSalary,
      },
    },
    trigger: { grossSalary },
    forceDispatchEffect: () => !!grossSalary,
  });

  useEffect(() => {
    if (response && !loading) {
      dispatch({ type: 'POST_SALARY', payload: response?.data });
    }
  }, [response, loading]);

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const onSubmit = useCallback((data) => {
    setSalary(data.grossSalary);
  }, []);

  return (
    <Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'inline-block' }}>
          <TextField
            InputProps={{
              name: 'grossSalary',
              defaultValue: '',
              placeholder: 'Insert your gross salary',
            }}
            inputRef={register}
            error={errors.grossSalary !== undefined}
            helperText={<FieldError error={errors.grossSalary} />}
          />
        </div>
        <div style={{ display: 'inline-block', float: 'right' }}>
          <Button variant="contained" color="primary" type="submit">
            Calculate
          </Button>
        </div>
      </form>
    </Grid>
  );
};

export default CalculationBar;
