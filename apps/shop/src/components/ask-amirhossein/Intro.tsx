import React from 'react';
import Image from 'next/image';

import questionIllustration from '../../assets/images/ask-amirhossein/question-illustration.svg';

const AskAmirhosseinIntro = () => {
  return (
    <>
      <Image
        src={questionIllustration}
        width={1000}
        alt="از امیرحسین بپرس"
        className="max-w-2xl mx-auto"
      />

      <h1 className="text-center font-extrabold text-7xl text-light-blue">
        خوش اومدی 👋
      </h1>
    </>
  );
};

export default AskAmirhosseinIntro;
