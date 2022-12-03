import React from 'react';
import { Tab } from '@headlessui/react';
import { m as motion } from 'framer-motion';
import { Alert, graphqlClient, Loadable } from '@zeenzen/common';
import { useAskAmirhosseinsUserRelatedQuery } from '@zeenzen/data';

import AskAmirhosseinQuestion from 'apps/shop/src/common/AskAmirhosseinQuestion';
import { tabAnimation } from 'apps/shop/pages/user/dashboard/questions';

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

      <Loadable isLoading={isLoading} fragment>
        <div className="space-y-12">
          {data?.askAmirhosseinsRelated.map((askAmirhossein) => (
            <AskAmirhosseinQuestion
              key={askAmirhossein.id}
              {...askAmirhossein}
            />
          ))}
        </div>
      </Loadable>
    </Tab.Panel>
  );
};

export default AskAmirhosseinTab;
