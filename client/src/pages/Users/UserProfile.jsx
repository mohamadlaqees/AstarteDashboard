import React from 'react';
import { useForm, Controller, FormProvider,useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import AvatarUpload from '../../components/AvatarUpload';

function UserProfile() {
    const methods = useFormContext();

  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <FormProvider {...methods}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box width="100%" maxWidth="400px">
          <AvatarUpload />
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                label="First Name"
                autoFocus
                id="firstName"
                variant="outlined"
                fullWidth
                error={!!errors.firstName}
                helperText={errors?.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                label="Last Name"
                autoFocus
                id="lastName"
                variant="outlined"
                fullWidth
                error={!!errors.lastName}
                helperText={errors?.lastName?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                label="Email"
                autoFocus
                id="email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
            )}
          />
        
        </Box>
      </Box>
    </FormProvider>
  );
}

export default UserProfile;
