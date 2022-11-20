import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';

type TDataForm = {
  name: string;
  login: string;
  password: string;
};

export const SignUpForm = () => {
  //todo get loading from redux
  const isLoading = false;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TDataForm>();

  const onSubmit = (data: TDataForm) => {
    //todo submit redux
    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        paddingTop: '10px',
        '& .MuiTextField-root': { mb: 3 },
        '& .MuiFormHelperText-root': { position: 'absolute', bottom: '-20px' },
      }}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: 'It`s required field' }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            variant="filled"
            helperText={errors.login?.message || ''}
            error={!!errors.login}
            fullWidth
          />
        )}
      />
      <Controller
        name="login"
        control={control}
        rules={{ required: 'It`s required field' }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Login"
            variant="filled"
            helperText={errors.login?.message || ''}
            error={!!errors.login}
            fullWidth
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: 'It`s required field' }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            variant="filled"
            helperText={errors.password?.message || ''}
            error={!!errors.password}
            fullWidth
          />
        )}
      />
      <LoadingButton type="submit" variant="contained" loading={isLoading}>
        Sign Up
      </LoadingButton>
    </Box>
  );
};
