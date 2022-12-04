import { Button, Box, Flex } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { selectUpdatedUser, selectDeletedUser } from 'store/user/user.selectors';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useEffect } from 'react';
import { FormControlBase } from 'components/FormControlBase/FormControlBase';
import { ControlInputBase } from 'components/ControlInputBase/ControlInputBase';
import { useTranslation } from 'react-i18next';
import { TUserCreate, IUserData } from 'types/types';
import { updateUserThunk, deleteUserThunk } from 'store/user/user.thunk';
import { selectIsLoadingSign } from 'store/sign/sign.selectors';
import { Portal } from 'components/Portal/Portal';
import { ConfirmModal } from 'components/ConfirmModal/ConfirmModal';
import { userActions } from 'store/user/user.slice';
import { getLSData } from 'utils/local-storage';
import { keysLS } from 'shared/consts';

const defaultValuesForm: TUserCreate = {
  name: '',
  login: '',
  password: '',
};

export const EditProfileForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = selectIsLoadingSign();
  const updatedUser = selectUpdatedUser();
  const deletedUser = selectDeletedUser();
  const { setDeletedUser } = userActions;

  const methodsForm = useForm<TUserCreate>({ defaultValues: defaultValuesForm });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methodsForm;

  const onSubmit = (data: TUserCreate) => {
    dispatch(updateUserThunk(data));
  };

  const deleteUser = () => {
    const user = getLSData<IUserData>(keysLS.userData);
    dispatch(setDeletedUser(user));
  };

  const handleCloseConfirm = () => {
    dispatch(setDeletedUser(null));
  };

  const confirmDeleteUser = () => {
    if (deletedUser) {
      dispatch(deleteUserThunk());
    }
  };

  useEffect(() => {
    if (updatedUser) {
      reset();
    }
  }, [updatedUser, reset]);

  return (
    <>
      <FormProvider {...methodsForm}>
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControlBase label={t('forms.name')} errorMessage={errors.name?.message}>
            <ControlInputBase
              name="name"
              rules={{ required: String(t('validateInput.required')) }}
              autoComplete="off"
              placeholder={t('forms.editNamePlaceholder')}
            />
          </FormControlBase>
          <FormControlBase label={t('forms.login')} errorMessage={errors.login?.message}>
            <ControlInputBase
              name="login"
              rules={{ required: String(t('validateInput.required')) }}
              autoComplete="off"
              placeholder={t('forms.editLoginPlaceholder')}
            />
          </FormControlBase>
          <FormControlBase label={t('forms.password')} errorMessage={errors.password?.message}>
            <ControlInputBase
              name="password"
              rules={{ required: String(t('validateInput.required')) }}
              autoComplete="off"
              type="password"
              placeholder={t('forms.editPasswordPlaceholder')}
            />
          </FormControlBase>
          <Flex columnGap={4} justify="space-between" flexWrap="wrap">
            <Button colorScheme="blue" mt={4} size="sm" isLoading={isLoading} type="submit">
              {t('forms.send')}
            </Button>
            <Button
              onClick={deleteUser}
              colorScheme="red"
              mt={4}
              size="sm"
              isLoading={isLoading}
              type="button"
            >
              {t('user.delete')}
            </Button>
          </Flex>
        </Box>
      </FormProvider>
      <Portal title={t('user.delete')} handleClose={handleCloseConfirm} isOpen={!!deletedUser}>
        <ConfirmModal
          confirm={confirmDeleteUser}
          isLoading={isLoading}
          question={`${t('user.deleteQuestion')} ${deletedUser?.login}?`}
          handleClose={handleCloseConfirm}
        />
      </Portal>
    </>
  );
};
