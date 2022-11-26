import { Button, Box } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { selectCreatedUserSign, selectIsLoadingSign } from 'store/sign/sign.selectors';
import { signUpThunk } from 'store/sign/sign.thunk';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useEffect } from 'react';
import { FormControlBase } from 'components/FormControlBase/FormControlBase';
import { ControlInputBase } from 'components/ControlInputBase/ControlInputBase';
import { useTranslation } from 'react-i18next';

type TDataForm = {
  name: string;
  login: string;
  password: string;
};

const defaultValuesForm = {
  name: '',
  login: '',
  password: '',
};

export const SignUpForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = selectIsLoadingSign();
  const createdUser = selectCreatedUserSign();

  const methodsForm = useForm<TDataForm>({ defaultValues: defaultValuesForm });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methodsForm;

  const onSubmit = (data: TDataForm) => {
    dispatch(signUpThunk(data));
  };

  useEffect(() => {
    if (createdUser) {
      reset();
    }
  }, [createdUser, reset]);

  return (
    <FormProvider {...methodsForm}>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControlBase label={t('forms.name')} errorMessage={errors.name?.message}>
          <ControlInputBase name="name" rules={{ required: String(t('validateInput.required')) }} />
        </FormControlBase>
        <FormControlBase label={t('forms.login')} errorMessage={errors.name?.message}>
          <ControlInputBase
            name="login"
            rules={{ required: String(t('validateInput.required')) }}
          />
        </FormControlBase>
        <FormControlBase label={t('forms.password')} errorMessage={errors.name?.message}>
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
