import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faGithub,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import Newsletter from './Newsletter';
import zeenzenLogo from '../../../assets/images/zeenzen-logo.png';
import footerWaves from '../../../assets/images/landing-page/footer/wave-haikei.svg';
import heartEmoji from '../../../assets/images/landing-page/footer/heart-emoji.svg';
import muscleEmoji from '../../../assets/images/landing-page/footer/muscle-emoji.svg';

const Footer = () => {
  return (
    <footer className="relative md:mt-0 sm:mt-44 mt-56">
      <div className="w-full">
        <Image
          priority
          width={1980}
          src={footerWaves}
          alt="footer waves"
          className="object-fill"
        />
      </div>

      <div className="bg-dark-blue relative md:px-16 px-8 md:pt-16 pt-20 pb-4">
        <Newsletter />

        <div className="flex md:flex-row flex-col md:gap-20 gap-12 md:items-center text-white">
          <div>
            <h3 className="mb-6 md:text-2xl text-lg font-bold">صفحات سایت</h3>
            <ul className="flex md:flex-col md:items-start items-center gap-5 text-sm md:text-base">
              <li>خانه</li>
              <li>فروشگاه</li>
              <li>درباره من</li>
              <li>ارتباط با ما</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 md:text-2xl text-lg font-bold">دوره های ما</h3>
            <ul className="flex md:flex-col md:items-start items-center justify-between gap-y-5 flex-wrap text-sm md:text-base">
              <li className="basis-[45.5%]">دوره پیشرفته جاوااسکریپت</li>
              <li className="basis-[45.5%]">دوره مقدماتی ریکت</li>
              <li className="basis-[45.5%]">دوره طراحی وب</li>
              <li className="basis-[45.5%]">دوره تایپ اسکریپت</li>
            </ul>
          </div>

          <div className="md:mr-auto self-center md:scale-100 scale-90">
            <Image
              src={zeenzenLogo}
              alt="ZeenZen logo"
              width={200}
              height={200}
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col-reverse gap-8 text-white items-center justify-center mt-10">
          <div className="flex gap-2 items-start justify-center grow">
            <p>ساخته شده با</p>
            <p>
              <Image src={heartEmoji} alt="heart" width={25} height={25} />
            </p>
            <p>و</p>
            <p>
              <Image src={muscleEmoji} alt="muscle" width={25} height={25} />
            </p>
          </div>

          <div className="flex gap-5 items-center">
            <a href="#" target="_blank">
              <FontAwesomeIcon icon={faLinkedinIn} size="xl" />
            </a>
            <a href="#" target="_blank">
              <FontAwesomeIcon icon={faGithub} size="xl" />
            </a>
            <a href="#" target="_blank">
              <FontAwesomeIcon icon={faInstagram} size="xl" />
            </a>
            <a href="#" target="_blank">
              <FontAwesomeIcon icon={faYoutube} size="xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
