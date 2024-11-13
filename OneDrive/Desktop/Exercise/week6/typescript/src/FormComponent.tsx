import { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DatePicker}  from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import UserDataGrid from './DataGridComponent';
import FormDialog, { FormDialogHandle } from './FormDialog';
import { useUsers } from './UsersContext';
import { UsersProvider } from './UsersContext';

export interface FormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  dateOfBirth: string |null;
  phoneNumber: string;
  address: string;
}

const FormComponent = () => {
  const { register, handleSubmit, formState: { errors }, reset, getValues, setValue } = useForm<FormValues>();
  const { users, setUsers, saveUsersToLocalStorage } = useUsers(); 
  const dialogRef = useRef<FormDialogHandle>(null);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const updatedUsers = [...users, data];
    setUsers(updatedUsers); 
    saveUsersToLocalStorage(updatedUsers); 
    dialogRef.current?.show();
    reset(); 
  };

  return (
    <Box
      component="form"
      sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h2" gutterBottom>
        Register Here
      </Typography>

      <TextField
        label="Full Name"
        fullWidth
        margin="normal"
        {...register('fullName', { required: 'Full Name is required' })}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
      />

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Email is invalid'
          }
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Birthday"
          onChange={(date) => setValue('dateOfBirth', date as string | null)}     
        />
      </LocalizationProvider>

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          },
          validate: (value) => value.includes('!') || 'Password must have !'
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
        {...register('confirmPassword', {
          required: 'Confirm Password is required',
          validate: (value) => value === getValues('password') || 'Passwords do not match'
        })}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />

      <TextField
        label="Age"
        type="number"
        fullWidth
        margin="normal"
        {...register('age', {
          required: 'Age is required',
          min: { value: 18, message: 'You must be at least 18' },
        })}
        error={!!errors.age}
        helperText={errors.age?.message}
      />

      <TextField
        label="Phone Number"
        fullWidth
        margin="normal"
        {...register('phoneNumber', {
          required: 'Phone Number is required',
          minLength: { value: 10, message: 'Phone Number must be 10 digits' }
        })}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber?.message}
      />

      <TextField
        label="Address"
        fullWidth
        margin="normal"
        {...register('address', {
          required: 'Address is required',
          minLength: { value: 10, message: 'Address must be at least 10 characters' }
        })}
        error={!!errors.address}
        helperText={errors.address?.message}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Submit Form
      </Button>

      <FormDialog ref={dialogRef} title="Form Submitted" content="Your form has been successfully submitted!" />
      <UsersProvider>
      <UserDataGrid  />
      </UsersProvider>
    </Box>
  );
};

export default FormComponent;
