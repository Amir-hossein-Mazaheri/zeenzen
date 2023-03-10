import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import useDigitInput from 'react-digit-input';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dayjs from 'dayjs';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import Countdown from 'react-countdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import {
  usePreSignUpMutation,
  useRemoveEmailValidationCodeMutation,
  useSignUpMutation,
} from '@zeenzen/data';
import {
  graphqlClient,
  Loadable,
  AlertMessage,
  AlertMessageSet,
  AppButton,
  AppLink,
  AppInput,
  PasswordInput,
  Alerts,
} from '@zeenzen/common';

import CenterLayout from '../src/layouts/CenterLayout';
import { NextPageWithLayout } from './_app';
import useAlert from '../src/hooks/useAlert';
import useToast from '../src/hooks/useToast';
import addToTitle from '../src/utils/addToTitle';
import signUpIllustration from '../src/assets/images/signin-signup/signup.svg';
import useSkipForUsers from '../src/hooks/useSkipForUsers';
import getPasswordRegex from '../src/utils/getPasswordRegex';
import useUserStore from '../src/store/useUserStore';
import getFormErrorMessages from '../src/utils/getFormErrorMessages';
import { LINKS } from '../src/constants/links';
import getErrorMessages from '../src/utils/getErrorMessages';

const signUpSchema = z.object({
  email: z
    .string()
    .min(1, { message: getFormErrorMessages().required })
    .email({ message: getFormErrorMessages().email }),
  password: z
    .string()
    .min(1, { message: getFormErrorMessages().required })
    .regex(...getPasswordRegex()),
});

const SignUpPage: NextPageWithLayout = () => {
  useSkipForUsers();

  const [errors, setErrors] = useState<AlertMessageSet>(new Set());
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [code, setCode] = useState('');
  const [expiresAt, setExpiresAt] = useState<Date>();

  const [alertsParent] = useAutoAnimate<HTMLDivElement>();

  const preSignUpMutation = usePreSignUpMutation(graphqlClient);

  const signUpMutation = useSignUpMutation(graphqlClient);

  const removeEmailValidationMutation =
    useRemoveEmailValidationCodeMutation(graphqlClient);

  const methods = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();

  const { preSignUp, signUp, signUpFailed, email, password } = useUserStore();

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

  const handlePreSignUp: SubmitHandler<z.infer<typeof signUpSchema>> = async (
    data
  ) => {
    try {
      const {
        preSignUp: { expiresAt },
      } = await preSignUpMutation.mutateAsync({
        preSignUpInput: {
          email: data.email,
        },
      });

      preSignUp(data);

      alert({
        title: '???? ?????????? ???????? ?????? ?????????? ????.',
        icon: 'success',
        html: `
            <p style="font-weight: 500;">????????: ???????? ?????? spam ???? ???? ????????.</p>
            <p style="font-weight: 900; margin-top: 0.5rem;"> ???? ?????????? ???? 10 ?????????? ???????? ?????????? ?????????? ??????.</p>
        `,
      }).fire();

      setShowCodeForm(true);

      setExpiresAt(() => dayjs(expiresAt).toDate());
    } catch (err) {
      const errors = err.response.errors.map((err) => ({
        text: err.message,
        type: 'error',
      }));

      setErrors(new Set(errors));
    }
  };

  const handleSignUp = async () => {
    try {
      const {
        signUp: { email: signUpEmail },
      } = await signUpMutation.mutateAsync({
        signUpInput: { email, password, code },
      });

      signUp(signUpEmail);

      alert({
        title: '????????????',
        icon: 'success',
        description: '?????? ???? ???????????? ?????? ?????? ???????? ?????? ?? ???? ???????????? ???????? ????????.',
      }).fire();

      router.replace(LINKS.SIGN_IN);
    } catch (err) {
      const errors = getErrorMessages(err).map<AlertMessage>((message) => ({
        text: message,
        type: 'error',
      }));

      setErrors(new Set(errors));
    }
  };

  const handleCountDownComplete = () => {
    setShowCodeForm(false);

    signUpFailed();

    toast({}).fire({
      text: '???????? ???? ?????????? ?????????? ???????? ???? ?????????? ???????? ????????.',
      icon: 'error',
    });

    removeEmailValidationMutation.mutate({
      removePreSignUpInput: {
        email,
      },
    });
  };

  return (
    <div className="md:w-[75%] w-[95%]">
      <Head>
        <title>{addToTitle('?????? ??????')}</title>
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

      <div className="flex flex-row-reverse justify-between items-center">
        <div className="relative basis-full md:basis-5/12 rounded-xl px-6 py-6 shadow-spread-shadow">
          {showCodeForm && (
            <div className="absolute flex flex-col justify-center gap-3 font-bold items-center left-0 bottom-full mb-5 bg-white shadow-mild-shadow px-12 py-5 rounded-xl">
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faStopwatch} size="lg" />

                <Countdown
                  date={expiresAt}
                  zeroPadDays={0}
                  zeroPadTime={1}
                  onComplete={handleCountDownComplete}
                />
              </div>
              <p>???????????? ???? ??????????</p>
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
                  {!showCodeForm ? '?????? ??????' : '???? ?????????? ?????????? ???? ???????? ????????'}
                </h1>

                <div className="mt-8 space-y-9">
                  {!showCodeForm ? (
                    <>
                      <AppInput
                        name="email"
                        id="signup-email"
                        placeholder="??????????"
                      />
                      <PasswordInput
                        name="password"
                        id="signup-password"
                        placeholder="?????? ????????"
                      />
                    </>
                  ) : (
                    <div className="flex flex-row-reverse gap-4 items-center justify-center">
                      {digits.map((digit) => (
                        <input
                          key={digit.ref.toString()}
                          className="md:w-16 md:h-16 w-12 h-12 text-center bg-gray-200 rounded-xl"
                          inputMode="decimal"
                          autoFocus
                          {...digit}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-7 flex items-center justify-end text-sm">
                  <AppLink text="???????? ???????????? ???????? ????????" href={LINKS.SIGN_IN} />
                </div>

                <div className="mt-8 flex justify-end">
                  <AppButton type="submit">
                    <p className="text-md font-black">?????? ??????</p>
                  </AppButton>
                </div>
              </form>
            </FormProvider>
          </Loadable>
        </div>

        <div className="basis-6/12 hidden md:flex items-center justify-center">
          <Image
            alt="???????????????????? ???????? ?????? ??????"
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
