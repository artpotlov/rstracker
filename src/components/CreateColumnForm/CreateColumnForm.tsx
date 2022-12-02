import { useEffect } from 'react';
import { Button, Box, ModalFooter, ModalBody } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { FormControlBase } from 'components/FormControlBase/FormControlBase';
import { ControlInputBase } from 'components/ControlInputBase/ControlInputBase';
import { useTranslation } from 'react-i18next';
import {
  selectBoard,
  selectCreatedColumn,
  selectIsUploadingColumns,
  selectOrderNewColumn,
} from 'store/columns/columns.selectors';
import { createColumnThunk } from 'store/columns/columns.thunk';

type TValuesForm = {
  title: string;
};

const defaultValuesForm: TValuesForm = {
  title: '',
};

export const CreateColumnForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isUploadingColumns = selectIsUploadingColumns();
  const createdColumn = selectCreatedColumn();
  const board = selectBoard();
  const orederNewColumn = selectOrderNewColumn();

  const methodsForm = useForm<TValuesForm>({ defaultValues: defaultValuesForm });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methodsForm;

  const onSubmit = ({ title }: TValuesForm) => {
    if (!board) return;
    dispatch(createColumnThunk({ boardId: board._id, order: orederNewColumn, title }));
  };

  useEffect(() => {
    if (createdColumn) {
      reset();
    }
  }, [createdColumn, reset]);

  return (
    <FormProvider {...methodsForm}>
      <ModalBody>
        <Box as="form" id="createColumns" onSubmit={handleSubmit(onSubmit)}>
          <FormControlBase label={t('forms.columnName')} errorMessage={errors.title?.message}>
            <ControlInputBase
              name="title"
              rules={{ required: String(t('validateInput.required')) }}
            />
          </FormControlBase>
        </Box>
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="blue"
          size="sm"
          type="submit"
          form="createColumns"
          isLoading={isUploadingColumns}
        >
          {t('forms.create')}
        </Button>
      </ModalFooter>
    </FormProvider>
  );
};