import React from 'react';
import { m as motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { useQuestionHubQuestionsUserRelatedQuery } from '@zeenzen/data';
import { graphqlClient } from '@zeenzen/common';

import { tabAnimation } from 'apps/shop/pages/user/dashboard/questions';

const QuestionHubTab = () => {
  const { data, isLoading, error } =
    useQuestionHubQuestionsUserRelatedQuery(graphqlClient);

  return (
    <Tab.Panel
      as={motion.div}
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
