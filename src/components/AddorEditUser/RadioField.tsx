import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {FormikProps, validateYupSchema} from 'formik';
import {FormHelperText} from '@mui/material';
import * as types from './types';

interface IProps extends FormikProps<types.IInitialValue> {
  name: string;
  label: string;
  items: types.IGender[];
}

const RadioField = ({
  name,
  label,
  handleChange,
  items,
  values,
  submitCount,
  errors,
}: IProps) => {
  return (
    <FormControl>
      <FormLabel id='demo-radio-buttons-group-label'>{label}</FormLabel>
      <RadioGroup name={name} row value={values.gender} onChange={handleChange}>
        {items.map((gender) => (
          <FormControlLabel
            control={<Radio />}
            label={gender.label}
            key={gender.label}
            value={gender.value}
          />
        ))}
      </RadioGroup>
      {!!submitCount && errors.gender && (
        <FormHelperText>{errors.gender}</FormHelperText>
      )}
    </FormControl>
  );
};

export default RadioField;
