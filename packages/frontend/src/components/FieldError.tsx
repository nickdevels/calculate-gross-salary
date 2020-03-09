import React from 'react';
import { FieldError as RHFFieldError, NestDataObject } from 'react-hook-form';

type Props = {
  error?: RHFFieldError | RHFFieldError[] | NestDataObject<{}> | NestDataObject<{}>[];
};

const isRHFFieldError = (value: any): value is RHFFieldError => {
  return value && value.message !== undefined;
};

export const FieldError: React.FC<Props> = ({ error }: Props) => {
  if (isRHFFieldError(error)) {
    return <>{error.message}</>;
  }
  return null;
};
