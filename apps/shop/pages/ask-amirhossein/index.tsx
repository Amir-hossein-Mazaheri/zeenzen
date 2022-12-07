import React from 'react';
import Head from 'next/head';

import ShopLayout from '../../src/layouts/ShopLayout';
import { NextPageWithLayout } from '../_app';
import addToTitle from '../../src/utils/addToTitle';
import AskAmirhosseinIntro from '../../src/components/ask-amirhossein/Intro';
import AskAmirhosseinNiceWork from '../../src/components/ask-amirhossein/NiceWork';
import AskAmirhosseinJoinAndGain from '../../src/components/ask-amirhossein/JoinAndGain';
import AskAmirhosseinQuestionForm from '../../src/components/ask-amirhossein/QuestionForm';
import AskAmirhosseinRecentQuestions from '../../src/components/ask-amirhossein/RecentQuestions';

const AskAmirhosseinPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{addToTitle('از امیرحسین بپرس')}</title>
      </Head>

      <div className="mx-auto md:w-[95%]">
        <AskAmirhosseinIntro />

        <div className="max-w-7xl mx-auto text-text-black md:mt-12 mt-6">
          <div className="md:text-xl text-center md:text-inherit leading-loose font-medium">
            <p>
              توی این صفحه میتونی هر سوالی که داری رو از من بپرسی 🤩، مهم نیست
              که سوالت چیه فقط بپرسش ولی قبلش بهت توصیه می کنم که بخش سولات رو
              که پایین همین صفحه هست رو ببینی ممکنه سوال تو رو کس دیگه ای پرسیده
              باشه، و برای استفاه از پتانسیل کامل این بخش بهتره که وارد سایت شده
              باشی 👍؛ اگه سوالت مربوط به یکی از دوره ها میشه باید سوالتو توی
              بخش کوئسشن هاب دوره مربوطه بپرسی ولی اگه سوالت محتوای دوره رو شامل
              نشه حتما جوابشو میگیری 😉 و حتما میدونی که اگه مشکلت مربوط به بخش
              پرداخت میشه باید تیکت بزنی 😎.
              <b>
                حتی اگه کاربر ما هم نباشی جواب برات ایمیل میشه و اگه کاربر ما
                باشی هم برات ایمیلش می کنیم و هم داخل پنل کاربری دسترسی بهش
                داری.
              </b>
            </p>

            <AskAmirhosseinNiceWork />

            <AskAmirhosseinJoinAndGain />
          </div>

          <AskAmirhosseinQuestionForm />

          <AskAmirhosseinRecentQuestions />
        </div>
      </div>
    </>
  );
};

AskAmirhosseinPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default AskAmirhosseinPage;
