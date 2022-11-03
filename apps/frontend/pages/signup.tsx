import Image from 'next/image';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import useDigitInput from 'react-digit-input';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dayjs from 'dayjs';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import {
  usePreSignUpMutation,
  useRemoveEmailValidationCodeMutation,
  useSignUpMutation,
} from '@zeenzen/data';

import CenterLayout from '../src/layouts/CenterLayout';
import { NextPageWithLayout } from './_app';
import graphqlClient from '../src/api/graphql-client';
import Alert, { AlertMessage, AlertMessageSet } from '../src/common/Alert';
import Loadable from '../src/common/Loadable';
import { useAppDispatch } from '../src/hooks/useAppDispatch';
import {
  selectUserCredentials,
  SIGN_IN,
  SIGN_UP,
  SIGN_Up_FAILED,
} from '../src/store/entities/user';
import useAlert from '../src/hooks/useAlert';
import { useAppSelector } from '../src/hooks/useAppSelector';
import useToast from '../src/hooks/useToast';
import addToTitle from '../src/utils/addToTitle';
import signUpIllustration from '../src/assets/images/signin-signup/signup.svg';
import useSkipForUsers from '../src/hooks/useSkipForUsers';
import getPasswordRegex from '../src/utils/getPasswordRegex';
import { GetServerSideProps } from 'next';

const Countdown = dynamic(() => import('react-countdown'));

const AppButton = dynamic(() => import('../src/common/AppButton'));
const AppInput = dynamic(() => import('../src/common/AppInput'));
const AppLink = dynamic(() => import('../src/common/AppLink'));
const PasswordInput = dynamic(() => import('../src/common/PasswordInput'));

interface PreSignUpFields {
  email: string;
  password: string;
}

const signUpSchema = Yup.object({
  email: Yup.string().email('ایمیل نا معتبر').required('این فیلد اجباری است'),
  password: Yup.string()
    .required('این فیلد اجباری است')
    .matches(...getPasswordRegex()),
}).required('این فیلد اجباری است');

const SignUpPage: NextPageWithLayout = () => {
  useSkipForUsers();

  const useCredentials = useAppSelector(selectUserCredentials);

  const [errors, setErrors] = useState<AlertMessageSet>(new Set());
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [code, setCode] = useState('');
  const [expiresAt, setExpiresAt] = useState<Date>();

  const [alertsParent] = useAutoAnimate<HTMLDivElement>();

  const preSignUpMutation = usePreSignUpMutation(graphqlClient);

  const signUpMutation = useSignUpMutation(graphqlClient);

  const removeEmailValidationMutation =
    useRemoveEmailValidationCodeMutation(graphqlClient);

  const methods = useForm<PreSignUpFields>({
    resolver: yupResolver(signUpSchema),
  });

  const router = useRouter();

  const dispatch = useAppDispatch();

  const alert = useAlert();

  const toast = useToast();

  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length: 5,
    value: code,
    onChange: setCode,
  });

  const handleRemoveError = (message: AlertMessage) => {
    setErrors((errors) => {
      errors.delete(message);
      return new Set(errors);
    });
  };

  const handlePreSignUp: SubmitHandler<PreSignUpFields> = async (data) => {
    try {
      const { preSignUp } = await preSignUpMutation.mutateAsync({
        preSignUpInput: {
          email: data.email,
        },
      });

      console.log('pre signed up: ', preSignUp);

      dispatch(SIGN_UP(data));

      alert({
        title: 'کد تایید برای شما ایمیل شد.',
        icon: 'success',
        html: `
            <p style="font-weight: 500;">توجه: حتما بخش spam رو چک کنید.</p>
            <p style="font-weight: 900; margin-top: 0.5rem;"> کد تایید تا 10 دقیقه دیگر معتبر خواهد بود.</p>
        `,
      }).fire();

      setShowCodeForm(true);

      setExpiresAt(() => dayjs(preSignUp.expiresAt).toDate());
    } catch (err: any) {
      console.log(err.response);

      const errors = err.response.errors.map((err: any) => ({
        text: err.message,
        type: 'error',
      }));

      setErrors(new Set(errors));
    }
  };

  const handleSignUp = async () => {
    try {
      const {
        signUp: { email },
      } = await signUpMutation.mutateAsync({
        signUpInput: { ...useCredentials, code },
      });

      dispatch(SIGN_IN({ email }));

      alert({
        title: 'هورااا',
        icon: 'success',
        description: 'شما با موفقیت ثبت نام کرده اید و می توانید وارد شوید.',
      }).fire();

      router.replace('/signin');
    } catch (err: any) {
      console.log(err.response);

      const errors = err.response.errors.map((err: any) => ({
        text: err.message,
        type: 'error',
      }));

      setErrors(new Set(errors));
    }
  };

  const handleCountDownComplete = async () => {
    setShowCodeForm(false);

    dispatch(SIGN_Up_FAILED());

    toast({}).fire({
      text: 'مهلت کد تایید ایمیل تمام شد مجددا تلاش کنید.',
      icon: 'error',
    });

    await removeEmailValidationMutation.mutateAsync({
      removePreSignUpInput: {
        email: useCredentials.email,
      },
    });
  };

  return (
    <div className="w-[75%]">
      <Head>
        <title>{addToTitle('ثبت نام')}</title>
      </Head>

      <div className="mb-5">
        <Alert
          onClose={handleRemoveError}
          className="font-semibold text-sm"
          messages={errors}
          ref={alertsParent}
        />
      </div>

      <div className="flex flex-row-reverse justify-between items-center">
        <div className="relative basis-5/12 rounded-xl px-6 py-6 shadow-spread-shadow">
          {showCodeForm && (
            <div className="absolute flex flex-col justify-center gap-3 font-bold items-center left-0 bottom-full mb-5 bg-white shadow-mild-shadow px-12 py-5 rounded-xl">
              <div className="flex items-center gap-1">
                {/* <WatchLaterIcon fontSize="medium" /> */}
                <FontAwesomeIcon icon={faStopwatch} size="lg" />
                <Countdown
                  date={expiresAt}
                  zeroPadDays={0}
                  zeroPadTime={1}
                  onComplete={handleCountDownComplete}
                />
              </div>
              <p>انقضای کد تایید</p>
            </div>
          )}

          <Loadable isLoading={preSignUpMutation.isLoading}>
            <FormProvider {...methods}>
              <form
                className="w-full"
                onSubmit={methods.handleSubmit(
                  !showCodeForm ? handlePreSignUp : handleSignUp
                )}
              >
                <h1 className="font-black text-3xl text-title-black text-center">
                  {!showCodeForm ? 'ثبت نام' : 'کد تایید ایمیل را وارد کنید'}
                </h1>

                <div className="mt-8 space-y-9">
                  {!showCodeForm ? (
                    <>
                      <AppInput
                        name="email"
                        id="signup-email"
                        placeholder="ایمیل"
                      />
                      <PasswordInput
                        name="password"
                        id="signup-password"
                        placeholder="رمز عبور"
                      />
                    </>
                  ) : (
                    <div className="flex flex-row-reverse gap-4 items-center justify-center">
                      {digits.map((digit) => (
                        <input
                          key={digit.ref.toString()}
                          className="w-16 h-16 text-center bg-gray-200 rounded-xl"
                          inputMode="decimal"
                          autoFocus
                          {...digit}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-7 flex items-center justify-end text-sm">
                  <AppLink text="حساب دارید؟ وارد شوید" href="/signin" />
                </div>

                <div className="mt-8 flex justify-end">
                  <AppButton type="submit">
                    <p className="text-md font-black">ثبت نام</p>
                  </AppButton>
                </div>
              </form>
            </FormProvider>
          </Loadable>
        </div>

        <div className="basis-6/12 flex items-center justify-center">
          <Image
            alt="ایراستریشن صفحه ثبت نام"
            src={signUpIllustration}
            width={609}
            height={459}
          />
        </div>
      </div>
    </div>
  );
};

SignUpPage.getLayout = function getLayout(page) {
  return <CenterLayout>{page}</CenterLayout>;
};

export default SignUpPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  console.log(req.cookies);

  return {
    props: {},
  };
};
