import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {FormikProps} from 'formik';
import {FormHelperText} from '@mui/material';
import * as types from './types';

interface IProps extends FormikProps<types.IInitialValue> {
  name: string;
  label: string;
  options: types.IPosition[];
}

const FormSelect = ({
  options,
  name,
  label,
  values,
  handleChange,
  errors,
  submitCount,
}: IProps) => {
  return (
    <Box sx={{minWidth: 120}}>
      <FormControl fullWidth error={!!submitCount && !!errors.position}>
        <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={values.position}
          label={label}
          name={name}
          onChange={handleChange}>
          {options.map((item) => (
            <MenuItem key={item.label} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        {!!submitCount && errors.position && (
          <FormHelperText>{errors.position}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default FormSelect;
