import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import * as z from 'zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppButton, AppInput, Loadable } from '@zeenzen/common';

import questionIllustration from '../../src/assets/images/ask-amirhossein/question-illustration.svg';
import problemIllustration from '../../src/assets/images/ask-amirhossein/problem-illustration.svg';
import shareIllustration from '../../src/assets/images/ask-amirhossein/share-illustration.svg';
import standingMan from '../../src/assets/images/ask-amirhossein/standing-man.png';
import ShopLayout from '../../src/layouts/ShopLayout';
import { NextPageWithLayout } from '../_app';
import addToTitle from '../../src/utils/addToTitle';
import useUser from '../../src/hooks/useUser';

const askAmirhosseinSchema = z.object({
  fullname: z
    .string()
    .regex(/^[\u0600-\u06FF\s]+$/, { message: 'نام و نام خانوادگی درست نیست' }),
  question: z.string().min(1, { message: 'پر کردن این فیلد الزامی می باشد' }),
});

const AskAmirhosseinPage: NextPageWithLayout = () => {
  const [isStandingManHidden, setIsStandingManHidden] = useState(true);

  const { user, loading, isAuthenticated } = useUser();

  const methods = useForm({
    resolver: zodResolver(askAmirhosseinSchema),
  });

  const handleSubmitAskAmirhossein: SubmitHandler<
    z.infer<typeof askAmirhosseinSchema>
  > = ({ fullname, question }) => {
    //
  };

  console.log(methods.formState.errors);

  return (
    <>
      <Head>
        <title>{addToTitle('از امیرحسین بپرس')}</title>
      </Head>

      <div className="mx-auto w-[95%]">
        <Image
          src={questionIllustration}
          width={1000}
          alt="از امیرحسین بپرس"
          className="max-w-2xl mx-auto"
        />

        <h1 className="text-center font-extrabold text-7xl text-light-blue">
          خوش اومدی 👋
        </h1>

        <div className="max-w-7xl mx-auto font-medium text-xl leading-loose text-text-black mt-12">
          <p>
            توی این صفحه میتونی هر سوالی که داری رو از من بپرسی 🤩، مهم نیست که
            سوالت چیه فقط بپرسش ولی قبلش بهت توصیه می کنم که بخش سوالات متداول
            که پایین همین صفحه هست رو ببینی، و برای استفاه از پتانسیل کامل این
            بخش بهتره که وارد سایت شده باشی 👍؛ اگه سوالت مربوط به یکی از دوره
            ها میشه باید سوالتو توی بخش کوئسشن هاب دوره مربوطه بپرسی ولی اگه
            سوالت محتوای دوره رو شامل نشه حتما جوابشو میگیری 😉 و حتما میدونی که
            اگه مشکلت مربوط به بخش پرداخت میشه باید تیکت بزنی 😎.
          </p>

          <div>
            <Image
              src={problemIllustration}
              width={600}
              alt="سوالات StackOverflow"
              className="mx-auto mt-7"
            />

            <h2 className="text-center font-extrabold text-5xl text-light-blue mt-7">
              یه کار جذاب 🥳
            </h2>

            <p className="mt-7">
              نه تنها در این بخش جواب سوالاتتون رو میدیم بلکه پر تکرار ترین
              سوالات StackOverflow رو در زمینه های JavaScript، React، NodeJs رو
              به فارسی ترجمه کردیم 🔥، که کمکی به توسعه دهندگان ایرانی کرده
              باشیم البته این سوالات برای تازه کارا میتونه خیلی مفید باشه 😁 و
              میتونن مثل یه خلاصه بخوننش، ولی این رو بدونین که برای رفع مشکلات
              خودتون حتما باید سرچ کنین.
            </p>

            <div className="flex justify-end mt-5">
              <AppButton link href="/stack-overflow" rounded>
                <span>سوالات ترجمه شده StackOverflow</span>
              </AppButton>
            </div>
          </div>

          <div>
            <Image
              src={shareIllustration}
              width={600}
              alt="سوالات StackOverflow"
              className="mx-auto mt-7"
            />

            <h2 className="text-center font-extrabold text-5xl text-light-blue mt-7">
              تو هم میتونی مشارکت کنی
            </h2>

            <p className="mt-7">
              هر یک از شما میتونه جواب سوالات بقیه رو بدین 🆒 و امتیاز دریافت
              کنید و با امتیاز های جمع شده دوره ها رو با تخفیف بخرید 🤑، هر یک
              از سوالات رو که جواب بدین بعد از تایید امتیاز دریافت می کنید و
              هرکسی که جواب شما رو لایک کنه امتیاز دریافت می کنید و اگه کسی که
              سوال رو پرسیده جواب شما رو لایک کنه امتیاز بیشتری دریافت می کنید
              💯.
            </p>
          </div>
        </div>

        <div className="mt-24">
          <h3 className="text-center font-extrabold text-5xl text-light-blue mb-10">
            سوالتو اینجا بپرس 🤔
          </h3>

          <div className="flex items-center">
            {isStandingManHidden && (
              <Image
                src={standingMan}
                width={180}
                alt="مرد ایستاده"
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
                        label="نام و نام خانوادگی"
                        name="fullname"
                        defaultValue={
                          isAuthenticated && user?.firstname && user.lastname
                            ? `${user?.firstname} ${user?.lastname}`
                            : ''
                        }
                      />

                      <AppInput
                        label="سوال"
                        name="question"
                        placeholder="سوالتو اینجا بنویس..."
                        className="min-h-[10rem]"
                        textArea
                      />

                      <div className="flex justify-end">
                        <AppButton type="submit">
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
      </div>
    </>
  );
};

AskAmirhosseinPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default AskAmirhosseinPage;
