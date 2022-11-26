import React from 'react';
import dynamic from 'next/dynamic';
import { MoonLoader } from 'react-spinners';
import * as z from 'zod';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AppButton,
  AppLink,
  Conditional,
  FalseCondition,
  graphqlClient,
  Loadable,
  ShadowBox,
  TrueCondition,
} from '@zeenzen/common';
import { useAnswerAskAmirhosseinMutation } from '@zeenzen/data';

import getFormErrorMessages from '../../utils/getFormErrorMessages';
import useUser from '../../hooks/useUser';
import useToast from '../../hooks/useToast';
import getErrorMessages from '../../utils/getErrorMessages';

const TextEditor = dynamic(() => import('../../../src/common/TextEditor'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex justify-between items-center">
      <MoonLoader />
    </div>
  ),
});

interface SendAnswerFormProps {
  questionId: number;
}

const answerSchema = z.object({
  description: z
    .string({
      required_error: getFormErrorMessages().required,
    })
    .min(1, { message: getFormErrorMessages().required }),
});

const SendAnswerForm: React.FC<SendAnswerFormProps> = ({ questionId }) => {
  const { isAuthenticated, loading } = useUser();

  const methods = useForm({
    resolver: zodResolver(answerSchema),
  });

  const answerAskAmirhosseinMutation =
    useAnswerAskAmirhosseinMutation(graphqlClient);

  const toast = useToast();

  const handleSubmitAskAmirhosseinAnswer: SubmitHandler<
    z.infer<typeof answerSchema>
  > = async ({ description }) => {
    try {
      await answerAskAmirhosseinMutation.mutateAsync({
        answerAskAmirhosseinInput: {
          id: questionId,
          answer: description,
        },
      });

      methods.resetField('description');

      toast().fire({
        title:
          'جواب شما با موفقیت ثبت شد بعد از تایید در این صفحه نمایش داده خواهد شد',
        icon: 'success',
      });
    } catch (err) {
      getErrorMessages(err).map((message) => {
        toast().fire({
          title: message,
          icon: 'error',
        });
      });
    }
  };

  return (
    <ShadowBox
      title="جوابشو بده"
      titleClassName="text-4xl font-bold"
      className="px-8 pt-12 pb-8 mt-20"
      id="answer-form"
    >
      <Loadable isLoading={loading}>
        <Conditional condition={isAuthenticated}>
          <FalseCondition>
            <p className="text-center font-medium text-xl">
              <span>برای ارسال پاسخ باید</span>{' '}
              <span>
                <AppLink text="وارد" href="/signin" />
              </span>{' '}
              <span>شوید</span>
            </p>
          </FalseCondition>
          <TrueCondition>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(
                  handleSubmitAskAmirhosseinAnswer
                )}
              >
                <Controller
                  name="description"
                  control={methods.control}
                  render={({ field }) => (
                    <TextEditor onChange={field.onChange} />
                  )}
                />

                {methods.formState.errors?.description && (
                  <p className="mt-5 text-red-500 font-medium">
                    {methods.formState.errors?.description.message?.toString()}
                  </p>
                )}

                <div className="flex justify-end mt-7">
                  <AppButton
                    type="submit"
                    loading={answerAskAmirhosseinMutation.isLoading}
                  >
                    <span>ارسال پاسخ</span>
                  </AppButton>
                </div>
              </form>
            </FormProvider>
          </TrueCondition>
        </Conditional>
      </Loadable>
    </ShadowBox>
  );
};

export default SendAnswerForm;
