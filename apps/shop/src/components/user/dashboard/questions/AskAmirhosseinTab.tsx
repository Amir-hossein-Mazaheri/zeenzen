import React from 'react';
import { Tab } from '@headlessui/react';
import { m as motion } from 'framer-motion';
import { Alert, graphqlClient, Loadable } from '@zeenzen/common';
import { useAskAmirhosseinsUserRelatedQuery } from '@zeenzen/data';

import AskAmirhosseinQuestion from '../../../../../src/common/AskAmirhosseinQuestion';
import { tabAnimation } from '../../../../../pages/user/dashboard/questions';

const AskAmirhosseinTab = () => {
  const { data, isLoading, error } =
    useAskAmirhosseinsUserRelatedQuery(graphqlClient);

  return (
    <Tab.Panel
      as={motion.div}
      initial="hide"
      animate="show"
      exit="hide"
      variants={tabAnimation}
      className="pb-12"
    >
      <Alert color="info" className="mb-10" rounded>
        <p>تعداد کل سوالات پرسیده شده: {data?.askAmirhosseinsRelated.length}</p>
      </Alert>

      <Loadable isLoading={isLoading} error={String(error)} fragment>
        {data?.askAmirhosseinsRelated.length &&
        data.askAmirhosseinsRelated.length > 0 ? (
          <div className="space-y-12">
            {data?.askAmirhosseinsRelated.map((askAmirhossein) => (
              <AskAmirhosseinQuestion
                key={askAmirhossein.id}
                {...askAmirhossein}
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

export default AskAmirhosseinTab;
