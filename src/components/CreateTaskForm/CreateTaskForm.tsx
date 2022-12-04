import { useEffect } from 'react';
import { Box, Button, ModalBody, ModalFooter } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { FormControlBase } from 'components/FormControlBase/FormControlBase';
import { ControlInputBase } from 'components/ControlInputBase/ControlInputBase';
import { useTranslation } from 'react-i18next';
import { selectCreatedBoard, selectIsLoadingBoards } from 'store/boards/boards.selectors';
import { selectAllUsersOptions } from 'store/users/users.selectors';
import { ControlSelectBase } from 'components/ControlSelectBase/ControlSelectBase';
import { selectAuthUser } from 'store/user/user.selectors';
import { ControlTextareaBase } from '../ControlTextareaBase/ControlTextareaBase';

type TCreateBoardFormProps = {
  handleClose: () => void;
};

type TUsersForm = {
  label: string;
  value: string;
};

type TValuesForm = {
  title: string;
  description: string;
  userId: string;
  users: TUsersForm[];
  boardId: string;
  columnId: string;
  order: number;
};

const defaultValuesForm: TValuesForm = {
  // TODO сделать запрос в стейт для дефолтных значений (понадобится для редактирования задачи)
  title: '',
  description: '',
  userId: '',
  users: [],
  boardId: '',
  columnId: '',
  order: 0,
};

export const CreateTaskForm = ({ handleClose }: TCreateBoardFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoadingTasks = selectIsLoadingBoards(); // TODO Изменить сеслектор
  const createdTask = selectCreatedBoard(); // TODO Изменить селектор
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
    // TODO добавить вызов диспатчера
    // dispatch(createTaskThunk({});
  };

  useEffect(() => {
    if (createdTask) {
      reset();
    }
  }, [createdTask, reset]);

  return (
    <FormProvider {...methodsForm}>
      <ModalBody>
        <Box as="form" id="createTask" onSubmit={handleSubmit(onSubmit)}>
          <FormControlBase label={t('forms.taskName')} errorMessage={errors.title?.message}>
            <ControlInputBase
              name="title"
              rules={{ required: String(t('validateInput.required')) }}
            />
          </FormControlBase>
          <FormControlBase
            label={t('forms.taskDescription')}
            errorMessage={errors.description?.message}
          >
            <ControlTextareaBase
              name="description"
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
          form="createTask"
          isLoading={isLoadingTasks}
        >
          {t('tasks.createButton')}
        </Button>
        <Button
          colorScheme="blue"
          variant="outline"
          ml="2"
          size="sm"
          disabled={isLoadingTasks}
          onClick={handleClose}
        >
          {t('forms.cancel')}
        </Button>
      </ModalFooter>
    </FormProvider>
  );
};
