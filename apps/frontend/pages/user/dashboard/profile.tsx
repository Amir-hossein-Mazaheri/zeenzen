import React, { ChangeEventHandler } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
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
import getPasswordRegex from '../../../src/utils/getPasswordRegex';
import useToast from '../../../src/hooks/useToast';

interface UserProfileFields {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  newPassword: string;
  repeatNewPassword: string;
}

const userProfileSchema = Yup.object({
  firstname: Yup.string(),
  lastname: Yup.string(),
  email: Yup.string().email('ایمیل نا معتبر'),
  password: Yup.string().required(
    'برای اعمال تغییرات باید رمز عبور خود را وارد کنید'
  ),
  newPassword: Yup.string().matches(...getPasswordRegex(true)),
  repeatNewPassword: Yup.string().oneOf(
    [Yup.ref('newPassword'), null],
    'رمز عبور ها مطابقت ندارند'
  ),
});

const UserProfilePage: NextPageWithLayout = () => {
  const { loading, user, refetch: refetchUser } = useProtectedRoute();

  const updateUserMutation = useLimitedUpdateUserMutation(graphqlClient);

  const methods = useForm<UserProfileFields>({
    resolver: yupResolver(userProfileSchema),
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

  const handleUserProfileUpdate: SubmitHandler<UserProfileFields> = async (
    data
  ) => {
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

      alert({
        title: 'مشکلی پیش آمده است',
        icon: 'error',
        description: err?.response.errors[0].message,
      }).fire();
    }
  };

  return (
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
          </form>
        </FormProvider>

        <div className="flex justify-end">
          <AppButton type="submit">
            <span className="font-semibold">اعمال تغییرات</span>
          </AppButton>
        </div>
      </div>
    </Loadable>
  );
};

UserProfilePage.getLayout = function getLayout(page) {
  return <UserDashboardLayout>{page}</UserDashboardLayout>;
};

export default UserProfilePage;
