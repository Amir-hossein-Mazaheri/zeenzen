import React, { useState } from 'react';
import Image from 'next/image';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppButton, AppInput, graphqlClient, Loadable } from '@zeenzen/common';
import { useCreateAskAmirhosseinMutation } from '@zeenzen/data';
import * as z from 'zod';

import standingMan from '../../assets/images/ask-amirhossein/standing-man.png';
import getErrorMessages from '../../utils/getErrorMessages';
import useToast from '../../hooks/useToast';
import useUser from '../../hooks/useUser';
import getFormErrorMessages from '../../utils/getFormErrorMessages';

const askAmirhosseinSchema = z.object({
  email: z.string().email({ message: getFormErrorMessages().email }),
  question: z.string().min(1, { message: getFormErrorMessages().required }),
});

const AskAmirhosseinQuestionForm = () => {
  const [isStandingManHidden, setIsStandingManHidden] = useState(true);

  const { user, loading, isAuthenticated } = useUser();

  const createAskAmirhosseinMutation =
    useCreateAskAmirhosseinMutation(graphqlClient);

  const methods = useForm({
    resolver: zodResolver(askAmirhosseinSchema),
  });

  const toast = useToast();

  const handleSubmitAskAmirhossein: SubmitHandler<
    z.infer<typeof askAmirhosseinSchema>
  > = async ({ email, question }) => {
    try {
      await createAskAmirhosseinMutation.mutateAsync({
        createAskAmirhosseinInput: {
          email,
          question,
        },
      });

      methods.resetField('email');
      methods.resetField('question');

      toast().fire({
        title: 'هورااا، سوال شما با موفقیت ارسال شد 👍',
        icon: 'success',
      });
    } catch (err) {
      getErrorMessages(err).map((error) => {
        toast().fire({
          title: error,
          icon: 'error',
        });
      });
    }
  };

  return (
    <div className="mt-24" id="question-form">
      <h3 className="text-center font-extrabold text-5xl text-light-blue mb-10">
        سوالتو اینجا بپرس 🤔
      </h3>

      <div className="flex items-center">
        {isStandingManHidden && (
          <Image
            src={standingMan}
            width={180}
            alt="مرد ایستاده"
            quality={100}
            className="lg:block hidden"
            onError={() => setIsStandingManHidden(false)}
          />
        )}

        <Loadable isLoading={loading} fragment>
          <div className="rounded-xl grow bg-white shadow-mild-shadow px-12 py-10">
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(handleSubmitAskAmirhossein)}
                className="h-full"
              >
                <div className="flex flex-col justify-between h-full gap-9">
                  <AppInput
                    label="ایمیل"
                    name="email"
                    defaultValue={isAuthenticated ? user?.email : ''}
                  />

                  <AppInput
                    label="سوال"
                    name="question"
                    placeholder="سوالتو اینجا بنویس..."
                    className="min-h-[10rem]"
                    textArea
                  />

                  <div className="flex justify-end">
                    <AppButton
                      type="submit"
                      loading={createAskAmirhosseinMutation.isLoading}
                      className="flex gap-2 items-center"
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                      <span className="font-bold">ثبت و ارسال</span>
                    </AppButton>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </Loadable>
      </div>
    </div>
  );
};

export default AskAmirhosseinQuestionForm;
