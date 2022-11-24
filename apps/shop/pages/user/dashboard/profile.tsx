import React, { ChangeEventHandler } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import Head from 'next/head';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLimitedUpdateUserMutation } from '@zeenzen/data';
import {
  Avatar,
  AppButton,
  AppInput,
  PasswordInput,
  graphqlClient,
  Loadable,
  uploadAxios,
} from '@zeenzen/common';

import UserDashboardLayout from '../../../src/layouts/UserDashboardLayout';
import { NextPageWithLayout } from '../../_app';
import useAlert from '../../../src/hooks/useAlert';
import useProtectedRoute from '../../../src/hooks/useProtectedRoute';
import getFormErrorMessages from '../../../src/utils/getFormErrorMessages';
import useToast from '../../../src/hooks/useToast';
import addToTitle from '../../../src/utils/addToTitle';
import getPasswordRegex from 'apps/shop/src/utils/getPasswordRegex';
import getErrorMessages from 'apps/shop/src/utils/getErrorMessages';

const userProfileSchema = z
  .object({
    firstname: z
      .string()
      .min(3, { message: getFormErrorMessages().min('نام', 3) })
      .optional(),
    lastname: z.string().optional(),
    email: z.string().email({ message: getFormErrorMessages().email }),
    password: z
      .string()
      .min(1, { message: getFormErrorMessages().required })
      .optional(),
    newPassword: z.preprocess(
      (val: string) => (val.trim() === '' ? undefined : val),
      z
        .string()
        .regex(...getPasswordRegex())
        .optional()
    ),
    repeatNewPassword: z.string().optional(),
  })
  .superRefine(({ repeatNewPassword, newPassword }, ctx) => {
    if (newPassword && repeatNewPassword && repeatNewPassword !== newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: getFormErrorMessages().incorrectRepeatPassword,
        path: ['repeatNewPassword'],
      });
    }
  });

const UserProfilePage: NextPageWithLayout = () => {
  const { loading, user, refetch: refetchUser } = useProtectedRoute();

  const updateUserMutation = useLimitedUpdateUserMutation(graphqlClient);

  const methods = useForm<z.infer<typeof userProfileSchema>>({
    resolver: zodResolver(userProfileSchema),
  });

  const toast = useToast();

  const alert = useAlert();

  const handleChangeAvatar: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const avatarImage = event.target?.files?.[0] || '';

    const { isConfirmed } = await alert({
      title: 'آیا از تغییر عکس پروفایل اطمینان دارید؟',
      icon: 'question',
    }).fire({
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'نه همینکه هس خوبه!',
      confirmButtonText: 'آره',
    });

    if (isConfirmed) {
      const formData = new FormData();
      formData.append('avatar', avatarImage);

      try {
        await uploadAxios.post('/user/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        refetchUser();

        toast().fire({
          title: 'عکس پروفایل شما با موفقیت آپلود شد.',
          icon: 'success',
        });
      } catch (err: any) {
        console.log(err);

        toast().fire({
          title:
            err?.response?.data?.message ||
            'مشکلی در آپلود عکس پروفایل پیش آمده است، مجدد تلاش کنید.',
          icon: 'error',
        });
      }
    }
  };

  const handleUserProfileUpdate: SubmitHandler<
    z.infer<typeof userProfileSchema>
  > = async (data) => {
    const filteredData = new Map();

    Object.entries(data).map(([key, value]) => {
      if (value) {
        filteredData.set(key, value);
      }
    });

    try {
      await updateUserMutation.mutateAsync({
        limitedUpdateUserInput: Object.fromEntries(filteredData),
      });

      alert({
        title: 'تغییرات اعمال شد',
        icon: 'success',
        description: 'تغییرات شما با موفقیت اعمال شد.',
      }).fire();
    } catch (err: any) {
      console.log(err);

      getErrorMessages(err).map((message) => {
        alert({
          title: 'مشکلی پیش آمده است',
          icon: 'error',
          description: message,
        }).fire();
      });
    }
  };

  return (
    <>
      <Head>
        <title>
          {user
            ? addToTitle(`پروفایل کاربری ${user?.firstname} ${user?.lastname}`)
            : addToTitle('پروفایل کاربری')}
        </title>
      </Head>

      <Loadable isLoading={loading}>
        <div className="grow">
          <div className="flex justify-center">
            <Avatar image={user?.avatar?.fullPath} width={200} height={200} />
          </div>

          <form>
            <div className="flex justify-center mt-5">
              <AppButton outline className="relative cursor-pointer">
                <span>انتخاب عکس</span>
                <input
                  type="file"
                  onChange={handleChangeAvatar}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </AppButton>
            </div>
          </form>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleUserProfileUpdate)}>
              <div className="space-y-8 my-12">
                <AppInput
                  name="firstname"
                  label="نام:"
                  placeholder="نام خود را وارد کنید"
                  defaultValue={user?.firstname || ''}
                />
                <AppInput
                  name="lastname"
                  label="نام خانوادگی:"
                  placeholder="نام خانوادگی خود را وارد کنید"
                  defaultValue={user?.lastname || ''}
                />
                <AppInput
                  name="email"
                  label="ایمیل:"
                  placeholder="ایمیل خود را وارد کنید"
                  defaultValue={user?.email}
                />
                <PasswordInput
                  name="password"
                  label="رمز عبور فعلی: "
                  placeholder=""
                />
                <PasswordInput
                  name="newPassword"
                  label="رمز عبور جدید:"
                  placeholder=""
                />
                <PasswordInput
                  name="repeatNewPassword"
                  label="تکرار رمز عبور جدید:"
                  placeholder=""
                />
              </div>

              <div className="flex justify-end">
                <AppButton type="submit" loading={updateUserMutation.isLoading}>
                  <span className="font-semibold">اعمال تغییرات</span>
                </AppButton>
              </div>
            </form>
          </FormProvider>
        </div>
      </Loadable>
    </>
  );
};

UserProfilePage.getLayout = function getLayout(page) {
  return <UserDashboardLayout>{page}</UserDashboardLayout>;
};

export default UserProfilePage;
