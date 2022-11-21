import { Controller, useForm } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { signInThunk } from 'store/sign/sign.thunk';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { selectIsLoadingSign } from 'store/sign/sign.selectors';

type TDataForm = {
  login: string;
  password: string;
};

export const SignInForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = selectIsLoadingSign();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TDataForm>();

  const onSubmit = (data: TDataForm) => {
    dispatch(signInThunk(data));
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
        Sign In
      </LoadingButton>
    </Box>
  );
};
