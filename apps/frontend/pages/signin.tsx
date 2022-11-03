import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Head from 'next/head';
import { useSignInMutation } from '@zeenzen/data';

import signInIllustration from '../src/assets/images/signin-signup/signin.svg';
import AppButton from '../src/common/AppButton';
import AppInput from '../src/common/AppInput';
import AppLink from '../src/common/AppLink';
import CenterLayout from '../src/layouts/CenterLayout';
import { NextPageWithLayout } from './_app';
import graphqlClient from '../src/api/graphql-client';
import Alert, { AlertMessage, AlertMessageSet } from '../src/common/Alert';
import Loadable from '../src/common/Loadable';
import useToast from '../src/hooks/useToast';
import PasswordInput from '../src/common/PasswordInput';
import addToTitle from '../src/utils/addToTitle';
import useSkipForUsers from '../src/hooks/useSkipForUsers';

interface SignInFields {
  email: string;
  password: string;
}

const signInSchema = Yup.object({
  email: Yup.string().email('ایمیل نا معتبر').required('این فیلد اجباری است'),
  password: Yup.string().required('این فیلد اجباری است'),
}).required('این فیلد اجباری است');

const SignInPage: NextPageWithLayout = () => {
  useSkipForUsers();

  const [errors, setErrors] = useState<AlertMessageSet>(new Set());

  const [alertsParent] = useAutoAnimate<HTMLDivElement>();

  const mutation = useSignInMutation(graphqlClient);

  const methods = useForm<SignInFields>({
    resolver: yupResolver(signInSchema),
  });

  const toast = useToast();

  const router = useRouter();

  const handleRemoveError = (message: AlertMessage) => {
    setErrors((errors) => {
      errors.delete(message);
      return new Set(errors);
    });
  };

  const handleSignIn: SubmitHandler<SignInFields> = async (data) => {
    try {
      const { signIn } = await mutation.mutateAsync({
        signInInput: data,
      });

      console.log('logged in.', signIn);

      toast({}).fire({
        title: 'شما با موفقیت وارد شدید.',
        icon: 'success',
      });

      router.replace('/');
    } catch (err: any) {
      console.log(err.response);

      const errors = err?.response?.errors?.map((err: any) => ({
        text: err.message,
        type: 'error',
      }));

      setErrors(new Set(errors));
    }
  };

  return (
    <div className="w-[75%]">
      <Head>
        <title>{addToTitle('ورود')}</title>
      </Head>

      <div className="mb-5">
        <Alert
          onClose={handleRemoveError}
          className="font-semibold text-sm"
          messages={errors}
          ref={alertsParent}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="basis-5/12 rounded-xl px-6 py-6 shadow-spread-shadow">
          <Loadable isLoading={mutation.isLoading}>
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

                <div className="mt-7 flex items-center justify-between text-sm">
                  <AppLink
                    text="حساب کاربری ندارید؟ ثبت نام کنید"
                    href="/signup"
                  />
                  <AppLink
                    text="رمزت رو فراموش کردی؟"
                    href="/forgot-password"
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

        <div className="basis-6/12 flex items-center justify-center">
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
