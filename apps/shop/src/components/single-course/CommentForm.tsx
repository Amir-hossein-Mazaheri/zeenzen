import { zodResolver } from '@hookform/resolvers/zod';
import React, { ChangeEventHandler } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { AppButton, AppInput } from '@zeenzen/common';

import getFormErrorMessages from '../../utils/getFormErrorMessages';

export const commentSchema = z.object({
  content: z.string().min(1, { message: getFormErrorMessages().required }),
});

interface CommentFormProps {
  handleSubmit: SubmitHandler<z.infer<typeof commentSchema>>;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

const CommentForm: React.FC<CommentFormProps> = ({
  handleSubmit,
  defaultValue,
  onChange,
}) => {
  const methods = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
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
