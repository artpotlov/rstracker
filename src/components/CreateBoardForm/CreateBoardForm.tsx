import { useEffect } from 'react';
import { Button, Box, ModalFooter, ModalBody } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { FormControlBase } from 'components/FormControlBase/FormControlBase';
import { ControlInputBase } from 'components/ControlInputBase/ControlInputBase';
import { useTranslation } from 'react-i18next';
import { selectCreatedBoard, selectIsLoadingBoards } from 'store/boards/boards.selectors';
import { createBoardThunk } from 'store/boards/boards.thunk';
import { selectAllUsersOptions } from 'store/users/users.selectors';
import { ControlSelectBase } from 'components/ControlSelectBase/ControlSelectBase';
import { selectAuthUser } from 'store/user/user.selectors';

type TUsersForm = {
  label: string;
  value: string;
};

type TValuesForm = {
  title: string;
  users: TUsersForm[];
  owner: '';
};

const defaultValuesForm: TValuesForm = {
  title: '',
  users: [],
  owner: '',
};

export const CreateBoardForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoadingBoards = selectIsLoadingBoards();
  const createdBoard = selectCreatedBoard();
  const allUsersOptions = selectAllUsersOptions();
  const authUser = selectAuthUser();

  const methodsForm = useForm<TValuesForm>({ defaultValues: defaultValuesForm });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methodsForm;

  const onSubmit = (data: TValuesForm) => {
    const owner = authUser?.login || '';
    const users = data.users.map((user) => user.value);
    dispatch(createBoardThunk({ ...data, owner, users }));
  };

  useEffect(() => {
    if (createdBoard) {
      reset();
    }
  }, [createdBoard, reset]);

  return (
    <FormProvider {...methodsForm}>
      <ModalBody>
        <Box as="form" id="createBoard" onSubmit={handleSubmit(onSubmit)}>
          <FormControlBase label={t('forms.title')} errorMessage={errors.title?.message}>
            <ControlInputBase
              name="title"
              rules={{ required: String(t('validateInput.required')) }}
            />
          </FormControlBase>
          <FormControlBase label={t('forms.users')} errorMessage={errors.users?.message}>
            <ControlSelectBase name="users" options={allUsersOptions} isMulti />
          </FormControlBase>
        </Box>
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="blue"
          size="sm"
          type="submit"
          form="createBoard"
          isLoading={isLoadingBoards}
        >
          {t('forms.create')}
        </Button>
        <Button colorScheme="blue" variant="outline" ml="2" size="sm" disabled={isLoadingBoards}>
          {t('forms.cancel')}
        </Button>
      </ModalFooter>
    </FormProvider>
  );
};
