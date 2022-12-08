import React from 'react';
import Image from 'next/image';
import { AppButton } from '@zeenzen/common';

import problemIllustration from '../../assets/images/ask-amirhossein/problem-illustration.svg';
import { LINKS } from '../../constants/links';

const AskAmirhosseinNiceWork = () => {
  return (
    <div>
      <Image
        src={problemIllustration}
        width={600}
        alt="سوالات StackOverflow"
        className="mx-auto mt-7"
      />

      <h2 className="text-center font-extrabold md:text-5xl text-4xl text-light-blue mt-7">
        یه کار جذاب 🥳
      </h2>

      <p className="md:mt-7 mt-4 leading-loose">
        نه تنها در این بخش جواب سوالاتتون رو میدیم بلکه پر تکرار ترین سوالات
        StackOverflow رو در زمینه های JavaScript، React، NodeJs رو به فارسی
        ترجمه کردیم 🔥، که کمکی به توسعه دهندگان ایرانی کرده باشیم البته این
        سوالات برای تازه کارا میتونه خیلی مفید باشه 😁 و میتونن مثل یه خلاصه
        بخوننش، ولی این رو بدونین که برای رفع مشکلات خودتون حتما باید سرچ کنین.
      </p>

      <div className="flex justify-end mt-5">
        <AppButton link href={LINKS.STACK_OVERFLOW.INDEX} rounded>
          <span>سوالات ترجمه شده StackOverflow</span>
        </AppButton>
      </div>
    </div>
  );
};

export default AskAmirhosseinNiceWork;
