import React from 'react';
import Image from 'next/image';

import introImage from '../../assets/images/landing-page/intro/intro-illustration.svg';

const Intro = () => {
  return (
    <div className="flex md:flex-row flex-col gap-10 items-center justify-center">
      <div className="flex items-center aspect-square justify-center bg-white rounded-full shadow-spread-shadow">
        <Image
          className="scale-125 grow"
          width={500}
          height={500}
          src={introImage}
          alt="intro-image-illustration"
        />
      </div>

      <div className="max-w-3xl shrink">
        <h1 className="font-bold md:text-4xl text-center md:text-inherit leading-loose text-3xl text-title-black md:mb-9 mb-5">
          یادگیری هیچوقت اینقدر آسون نبوده!
        </h1>
        <p className="md:leading-[3rem] leading-[2.5] md:text-xl text-lg text-center md:text-inherit font-medium">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
          درصد گذشته، حال
        </p>
      </div>
    </div>
  );
};

export default Intro;
