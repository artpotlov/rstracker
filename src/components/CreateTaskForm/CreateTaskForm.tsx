import { useEffect } from 'react';
import { Box, Button, ModalBody, ModalFooter } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { FormControlBase } from 'components/FormControlBase/FormControlBase';
import { ControlInputBase } from 'components/ControlInputBase/ControlInputBase';
import { useTranslation } from 'react-i18next';
import {
  selectCreatedTask,
  selectIsUploadingTasks,
  selectOrderNewTask,
} from 'store/tasks/tasks.selectors';
import { selectBoard, selectBoardUsersOptions } from 'store/columns/columns.selectors';
import { createTaskThunk } from 'store/tasks/tasks.thunk';
import { ControlSelectBase } from 'components/ControlSelectBase/ControlSelectBase';
import { selectAuthUser } from 'store/user/user.selectors';
import { ControlTextareaBase } from '../ControlTextareaBase/ControlTextareaBase';

type TCreateBoardFormProps = {
  columnId: string;
  handleClose: () => void;
};

type TUsersForm = {
  label: string;
  value: string;
};

type TValuesForm = {
  title: string;
  description: string;
  users: TUsersForm[];
};

const defaultValuesForm: TValuesForm = {
  title: '',
  description: '',
  users: [],
};

export const CreateTaskForm = ({ columnId, handleClose }: TCreateBoardFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoadingTasks = selectIsUploadingTasks();
  const createdTask = selectCreatedTask();
  const boardUsersOptions = selectBoardUsersOptions();
  const authUser = selectAuthUser();
  const orderNewTask = selectOrderNewTask(columnId);
  const board = selectBoard();

  const methodsForm = useForm<TValuesForm>({ defaultValues: defaultValuesForm });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methodsForm;

  const onSubmit = (data: TValuesForm) => {
    if (!authUser || !board) return;
    const userId = authUser.userId;
    const boardId = board._id;
    const users = data.users.map((user) => user.value);
    dispatch(createTaskThunk({ ...data, users, userId, order: orderNewTask, boardId, columnId }));
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
            <ControlSelectBase name="users" options={boardUsersOptions} isMulti />
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
          {t('forms.create')}
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
