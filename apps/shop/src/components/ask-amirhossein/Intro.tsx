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
        className="max-w-full mx-auto"
      />

      <h1 className="text-center font-extrabold md:text-7xl text-4xl mt-9 md:mt-2 text-light-blue">
        خوش اومدی 👋
      </h1>
    </>
  );
};

export default AskAmirhosseinIntro;
