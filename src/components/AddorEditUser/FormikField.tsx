import {TextField} from '@mui/material';
import {ErrorMessage, Field, FormikProps} from 'formik';
import * as types from './types';

interface IProps extends FormikProps<types.IInitialValue> {
  name: string;
  label: string;
}

const FormikField = ({name, label, errors, submitCount}: IProps) => {
  return (
    <Field
      fullWidth
      as={TextField}
      name={name}
      label={label}
      error={!!submitCount && errors[name as keyof types.IInitialValue]}
      helperText={!!submitCount && <ErrorMessage name={name} />}
    />
  );
};

export default FormikField;
