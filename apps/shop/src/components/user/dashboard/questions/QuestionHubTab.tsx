import React from 'react';
import { m as motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { useQuestionHubQuestionsUserRelatedQuery } from '@zeenzen/data';
import { graphqlClient, Loadable } from '@zeenzen/common';

import { tabAnimation } from 'apps/shop/pages/user/dashboard/questions';
import AskAmirhosseinQuestion from 'apps/shop/src/common/AskAmirhosseinQuestion';

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
      <Loadable isLoading={isLoading}>
        {data?.questionHubQuestionsRelated.length &&
        data?.questionHubQuestionsRelated.length > 0 ? (
          <div className="space-y-12">
            {data?.questionHubQuestionsRelated.map((questionHubQuestion) => (
              <AskAmirhosseinQuestion
                key={questionHubQuestion.id}
                {...questionHubQuestion}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl font-bold text-text-black">
            متاسفانه سوالی وجود ندارد ☹️
          </p>
        )}
      </Loadable>
    </Tab.Panel>
  );
};

export default QuestionHubTab;
