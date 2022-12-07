import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useSignInMutation } from '@zeenzen/data';
import {
  AppInput,
  AppButton,
  AppLink,
  Alerts,
  AlertMessage,
  AlertMessageSet,
  PasswordInput,
  Loadable,
  graphqlClient,
} from '@zeenzen/common';
import { zodResolver } from '@hookform/resolvers/zod';

import signInIllustration from '../src/assets/images/signin-signup/signin.svg';
import CenterLayout from '../src/layouts/CenterLayout';
import { NextPageWithLayout } from './_app';
import useToast from '../src/hooks/useToast';
import addToTitle from '../src/utils/addToTitle';
import useSkipForUsers from '../src/hooks/useSkipForUsers';
import getFormErrorMessages from '../src/utils/getFormErrorMessages';
import { LINKS } from '../src/constants/links';
import getErrorMessages from '../src/utils/getErrorMessages';

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: getFormErrorMessages().required })
    .email({ message: getFormErrorMessages().email }),
  password: z.string().min(1, { message: getFormErrorMessages().required }),
});

const SignInPage: NextPageWithLayout = () => {
  useSkipForUsers();

  const [errors, setErrors] = useState<AlertMessageSet>(new Set());

  const [alertsParent] = useAutoAnimate<HTMLDivElement>();

  const signInMutation = useSignInMutation(graphqlClient);

  const methods = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const toast = useToast();

  const router = useRouter();

  const handleRemoveError = (message: AlertMessage) => {
    setErrors((errors) => {
      errors.delete(message);
      return new Set(errors);
    });
  };

  const handleSignIn: SubmitHandler<z.infer<typeof signInSchema>> = async (
    data
  ) => {
    try {
      await signInMutation.mutateAsync({
        signInInput: data,
      });

      toast({}).fire({
        title: 'شما با موفقیت وارد شدید.',
        icon: 'success',
      });

      router.replace(LINKS.INDEX);
    } catch (err) {
      console.log('sign in error: ', err);

      const errors = getErrorMessages(err).map<AlertMessage>((message) => ({
        text: message,
        type: 'error',
      }));

      setErrors(new Set(errors));
    }
  };

  return (
    <div className="md:w-[75%] w-[95%]">
      <Head>
        <title>{addToTitle('ورود')}</title>
      </Head>

      <div className="mb-5">
        <Alerts
          onClose={handleRemoveError}
          color="error"
          className="font-semibold text-sm"
          messages={errors}
          ref={alertsParent}
        />
      </div>

      <div className="flex justify-between items-center flex-wrap">
        <div className="md:basis-5/12 basis-full rounded-xl md:px-6 md:py-6 px-4 py-5 shadow-spread-shadow">
          <Loadable isLoading={signInMutation.isLoading}>
            <FormProvider {...methods}>
              <form
                className="w-full"
                onSubmit={methods.handleSubmit(handleSignIn)}
              >
                <h1 className="font-black text-3xl text-title-black text-center">
                  ورود
                </h1>

                <div className="mt-8 space-y-9">
                  <AppInput
                    name="email"
                    id="signin-email"
                    placeholder="ایمیل"
                  />
                  <PasswordInput
                    name="password"
                    id="signin-password"
                    placeholder="رمز عبور"
                  />
                </div>

                <div className="mt-7 flex items-center justify-between md:text-sm text-[0.8rem]">
                  <AppLink
                    text="حساب کاربری ندارید؟ ثبت نام کنید"
                    href={LINKS.SIGN_UP}
                  />
                  <AppLink
                    text="رمزت رو فراموش کردی؟"
                    href={LINKS.FORGOT_PASSWORD}
                  />
                </div>

                <div className="mt-8 flex justify-end">
                  <AppButton type="submit">
                    <p className="text-md font-black">ورود</p>
                  </AppButton>
                </div>
              </form>
            </FormProvider>
          </Loadable>
        </div>

        <div className="md:basis-6/12 hidden md:flex items-center justify-center">
          <Image
            alt="ایراستریشن صفحه ثبت نام"
            src={signInIllustration}
            width={609}
            height={459}
          />
        </div>
      </div>
    </div>
  );
};

SignInPage.getLayout = function getLayout(page) {
  return <CenterLayout>{page}</CenterLayout>;
};

export default SignInPage;
