import { yupResolver } from '@hookform/resolvers/yup';
import React, { ChangeEventHandler } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import AppButton from '../../common/AppButton';
import AppInput from '../../common/AppInput';
import getFormErrorMessages from '../../utils/getFormErrorMessages';

export interface CommentFormFields {
  content: string;
}
interface CommentFormProps {
  handleSubmit: SubmitHandler<CommentFormFields>;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

const commentSchema = Yup.object({
  content: Yup.string().required(getFormErrorMessages().required),
});

const CommentForm: React.FC<CommentFormProps> = ({
  handleSubmit,
  defaultValue,
  onChange,
}) => {
  const methods = useForm<CommentFormFields>({
    resolver: yupResolver(commentSchema),
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <AppInput
          textArea
          name="content"
          className="min-h-[10rem]"
          defaultValue={defaultValue}
          onInput={onChange}
        />

        <div className="flex justify-end">
          <AppButton type="submit" className="mt-5">
            <span>ارسال دیدگاه</span>
          </AppButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default CommentForm;
