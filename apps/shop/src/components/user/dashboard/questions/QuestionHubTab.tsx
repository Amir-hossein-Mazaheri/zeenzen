import React from 'react';
import { m as motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { tabAnimation } from 'apps/shop/pages/user/dashboard/questions';

const QuestionHubTab = () => {
  return (
    <Tab.Panel
      as={motion.div}
      key="question-hub-user-dash"
      initial="hide"
      animate="show"
      exit="hide"
      variants={tabAnimation}
      className="pb-12"
    >
      Question Tab
    </Tab.Panel>
  );
};

export default QuestionHubTab;
