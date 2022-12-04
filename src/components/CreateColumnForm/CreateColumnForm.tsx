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

type TCreateColumnFormProps = {
  handleClose: () => void;
};

type TValuesForm = {
  title: string;
};

const defaultValuesForm: TValuesForm = {
  title: '',
};

export const CreateColumnForm = ({ handleClose }: TCreateColumnFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isUploadingColumns = selectIsUploadingColumns();
  const createdColumn = selectCreatedColumn();
  const board = selectBoard();
  const orderNewColumn = selectOrderNewColumn();

  const methodsForm = useForm<TValuesForm>({ defaultValues: defaultValuesForm });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methodsForm;

  const onSubmit = ({ title }: TValuesForm) => {
    if (!board) return;
    dispatch(createColumnThunk({ boardId: board._id, order: orderNewColumn, title }));
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
        <Button
          colorScheme="blue"
          variant="outline"
          ml="2"
          size="sm"
          disabled={isUploadingColumns}
          onClick={handleClose}
        >
          {t('forms.cancel')}
        </Button>
      </ModalFooter>
    </FormProvider>
  );
};
