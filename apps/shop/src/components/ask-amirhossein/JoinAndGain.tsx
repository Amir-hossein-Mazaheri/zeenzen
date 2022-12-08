import React from 'react';
import Image from 'next/image';

import shareIllustration from '../../assets/images/ask-amirhossein/share-illustration.svg';

const AskAmirhosseinJoinAndGain = () => {
  return (
    <div>
      <Image
        src={shareIllustration}
        width={600}
        alt="سوالات StackOverflow"
        className="mx-auto mt-7"
      />

      <h2 className="text-center font-extrabold md:text-5xl text-3xl text-light-blue md:mt-7">
        تو هم میتونی مشارکت کنی
      </h2>

      <p className="md:mt-7 mt-4 leading-loose">
        هر یک از شما میتونه جواب سوالات بقیه رو بدین 🆒 و امتیاز دریافت کنید و
        با امتیاز های جمع شده دوره ها رو با تخفیف بخرید 🤑، هر یک از سوالات رو
        که جواب بدین بعد از تایید امتیاز دریافت می کنید و هرکسی که جواب شما رو
        لایک کنه امتیاز دریافت می کنید و اگه کسی که سوال رو پرسیده جواب شما رو
        لایک کنه امتیاز بیشتری دریافت می کنید 💯.
        <b>
          <mark>
            حتی برای پرسیدن سوال هم امتیاز دریافت می کنی و با لایک کردن جواب
            مورد علاقت برای خودت امتیاز جمع می کنی.
          </mark>
        </b>
      </p>
    </div>
  );
};

export default AskAmirhosseinJoinAndGain;
