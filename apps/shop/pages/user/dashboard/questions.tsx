import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Tab } from '@headlessui/react';

import { NextPageWithLayout } from '../../_app';
import UserDashboardLayout from 'apps/shop/src/layouts/UserDashboardLayout';
import { AnimatePresence, Variants } from 'framer-motion';

const AskAmirhosseinTab = dynamic(
  () =>
    import(
      '../../../src/components/user/dashboard/questions/AskAmirhosseinTab'
    ),
  {
    ssr: false,
  }
);

const QuestionHubTab = dynamic(
  () =>
    import('../../../src/components/user/dashboard/questions/QuestionHubTab'),
  {
    ssr: false,
  }
);

const tabs = ['از امیرحسین بپرس', 'کوئسشن هاب'];

export const tabAnimation: Variants = {
  hide: {
    opacity: 0,
    scale: 0,
    transformOrigin: 'top',
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.1,
    },
  },
  show: {
    opacity: 1,
    scale: 1,
    transformOrigin: 'top',
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 0.4,
    },
  },
};

const UserQuestionsPage: NextPageWithLayout = () => {
  const [index, setIndex] = useState(0);

  return (
    <Tab.Group onChange={setIndex} selectedIndex={index}>
      <Tab.List as="ul" className="flex justify-center items-center gap-16">
        {tabs.map((tab) => (
          <Tab key={tab} as="li" className="outline-none">
            {({ selected }) => (
              <span
                className={`${
                  selected
                    ? 'text-red-500 font-bold'
                    : 'text-gray-500 font-medium'
                } cursor-pointer text-base`}
              >
                {tab}
              </span>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-12">
        <AnimatePresence>
          <AskAmirhosseinTab />
          <QuestionHubTab />
        </AnimatePresence>
      </Tab.Panels>
    </Tab.Group>
  );
};

UserQuestionsPage.getLayout = function getLayout(page) {
  return <UserDashboardLayout>{page}</UserDashboardLayout>;
};

export default UserQuestionsPage;
