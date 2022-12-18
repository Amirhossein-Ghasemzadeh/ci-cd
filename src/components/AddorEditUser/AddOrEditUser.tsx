import {Button, Grid, TextField} from '@mui/material';
import {Form, Formik} from 'formik';
import FormikField from './FormikField';
import * as Yup from 'yup';
import FormSelect from './FormSelect';
import RadioField from './RadioField';
import {Container} from '@mui/system';
import * as types from './types';
import {useConsumeContext} from '../../context/UserContext';

const genderOptions: types.IGender[] = [
  {label: 'male', value: 0},
  {label: 'female', value: 1},
];

const positionOptions: types.IPosition[] = [
  {label: 'front', name: 'front'},
  {label: 'back', name: 'back'},
];

const validationSchema = Yup.object({
  name: Yup.string().required('لطفا نام خود را وارد کنید'),
  email: Yup.string().required('لطفا ایمیل خود را وارد کنید'),
  position: Yup.string().required('لطفا پوزیشن خود را وارد کنید'),
  gender: Yup.string().required('لطفا جنسیت خود را وارد کنید'),
});

const AddOrEditUser = () => {
  const {mode, addNewUser, edit, editUser} = useConsumeContext();
  const initialValues: types.IInitialValue = edit.data
    ? {
        name: edit.data.name,
        email: edit.data.email,
        position: edit.data.position,
        gender: edit.data.gender,
      }
    : {
        name: '',
        email: '',
        position: '',
        gender: 0,
      };

  const handleSubmit = (values: types.IInitialValue) => {
    if (mode === 'add') {
      addNewUser(values);
    } else {
      editUser(values);
    }
  };

  return (
    <>
      <h1>ّuser information form</h1>
      <Container>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {(props) => (
            <Form>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <FormikField {...props} label='name' name='name' />
                </Grid>
                <Grid item xs={6}>
                  <FormikField {...props} label='email' name='email' />
                </Grid>
                <Grid item xs={6}>
                  <FormSelect
                    name='position'
                    label='position'
                    options={positionOptions}
                    {...props}
                  />
                </Grid>
                <Grid item xs={6}>
                  <RadioField
                    {...props}
                    name='gender'
                    label='gender'
                    items={genderOptions}
                  />
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
              <Button type='submit' variant='contained'>
                ارسال
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default AddOrEditUser;
