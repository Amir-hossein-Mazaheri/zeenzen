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
    <footer className="relative">
      <div>
        <Image priority fill src={footerWaves} alt="footer waves" />
      </div>
      <div className="bg-dark-blue relative px-16 pt-12 pb-4">
        <Newsletter />

        <div className="flex gap-20 items-center text-white">
          <div>
            <h3 className="mb-6 text-2xl font-bold">صفحات سایت</h3>
            <ul className="space-y-5">
              <li>خانه</li>
              <li>فروشگاه</li>
              <li>درباره من</li>
              <li>ارتباط با ما</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-2xl font-bold">دوره های ما</h3>
            <ul className="space-y-5">
              <li>دوره پیشرفته جاوااسکریپت</li>
              <li>دوره مقدماتی ریکت</li>
              <li>دوره طراحی وب</li>
              <li>دوره تایپ اسکریپت</li>
            </ul>
          </div>

          <div className="mr-auto">
            <Image
              src={zeenzenLogo}
              alt="ZeenZen logo"
              width={200}
              height={200}
            />
          </div>
        </div>

        <div className="flex text-white items-center justify-center mt-10">
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
