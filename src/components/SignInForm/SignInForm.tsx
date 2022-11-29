import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button } from '@chakra-ui/react';
import { signInThunk } from 'store/sign/sign.thunk';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { selectIsLoadingSign } from 'store/sign/sign.selectors';
import { FormControlBase } from 'components/FormControlBase/FormControlBase';
import { ControlInputBase } from 'components/ControlInputBase/ControlInputBase';
import { useTranslation } from 'react-i18next';

type TDataForm = {
  login: string;
  password: string;
};

const defaultValuesForm = {
  login: '',
  password: '',
};

export const SignInForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = selectIsLoadingSign();

  const methodsForm = useForm<TDataForm>({ defaultValues: defaultValuesForm });

  const {
    handleSubmit,
    formState: { errors },
  } = methodsForm;

  const onSubmit = (data: TDataForm) => {
    dispatch(signInThunk(data));
  };

  return (
    <FormProvider {...methodsForm}>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControlBase label={t('forms.login')} errorMessage={errors.login?.message}>
          <ControlInputBase
            name="login"
            rules={{ required: String(t('validateInput.required')) }}
          />
        </FormControlBase>
        <FormControlBase label={t('forms.password')} errorMessage={errors.password?.message}>
          <ControlInputBase
            name="password"
            rules={{ required: String(t('validateInput.required')) }}
            type="password"
          />
        </FormControlBase>
        <Button colorScheme="blue" mt={4} size="sm" isLoading={isLoading} type="submit">
          {t('forms.send')}
        </Button>
      </Box>
    </FormProvider>
  );
};
