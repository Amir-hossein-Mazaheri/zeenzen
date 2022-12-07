import React from 'react';
import { UnderlinedTitle } from '@zeenzen/common';

import Reason from './Reason';
import projectBased from '../../../assets/images/landing-page/why-us/Web Programming_Flat.svg';
import highQuality from '../../../assets/images/landing-page/why-us/Learning_Flat.svg';
import fairPrice from '../../../assets/images/landing-page/why-us/Money Bag_Flat.svg';
import newTeachingMethod from '../../../assets/images/landing-page/why-us/Education_Flat.svg';
import satisfaction from '../../../assets/images/landing-page/why-us/Star_Flat.svg';

const reasons = [
  {
    img: projectBased,
    title: 'آموزش پروژه محور',
    description: 'پروژه های کاربردی و عمیق کننده',
  },
  {
    img: highQuality,
    title: 'کیفیت آموزشی بالا',
    description: `کیفیت تصویر و صوتی بالا به همراه آموزش مفهومی`,
  },
  {
    img: fairPrice,
    title: 'قیمت مناسب',
    description: 'قیمت متناسب با اقتصاد فعلی ایران',
  },
  {
    img: newTeachingMethod,
    title: 'متد آموزشی متفاوت',
    description: 'استفاده از شیوه آموزشی برای بهره وری بیشتر',
  },
  {
    img: satisfaction,
    title: 'رضایتمندی',
    description: 'رضایتمندی اکثر دانشجویان دوره ها',
  },
];

const WhyUs = () => {
  return (
    <div>
      <UnderlinedTitle
        center
        element="h1"
        size="text-6xl md:text-5xl"
        title="چرا ما؟"
      />

      <div className="flex md:flex-row gap-12 md:gap-0 flex-col justify-between md:mt-16 mt-12">
        {reasons.map(({ img, title, description }) => (
          <Reason key={img} img={img} title={title} description={description} />
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
