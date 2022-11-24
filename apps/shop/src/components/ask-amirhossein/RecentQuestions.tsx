import React from 'react';
import { useAskAmirhosseinsQuery } from '@zeenzen/data';
import { AppButton, graphqlClient, Loadable } from '@zeenzen/common';

import AskAmirhosseinQuestion from '../../common/AskAmirhosseinQuestion';

const AskAmirhosseinRecentQuestions = () => {
  const {
    data: askAmirhosseinsData,
    isLoading,
    error,
  } = useAskAmirhosseinsQuery(graphqlClient);

  return (
    <Loadable isLoading={isLoading} fragment>
      <div className="mt-24">
        <h3 className="mb-16 font-bold text-4xl text-center text-light-blue">
          آخرین سوالات پرسیده شده
        </h3>

        <div className="space-y-10">
          {askAmirhosseinsData?.paginatedAskAmirhosseins.askAmirhosseins.map(
            (askAmirhossein) => (
              <AskAmirhosseinQuestion {...askAmirhossein} />
            )
          )}
        </div>

        <div className="flex justify-center mt-8">
          <AppButton link href="/ask-amirhossein/questions" outline rounded>
            <span>مشاهده تمامی سوالات</span>
          </AppButton>
        </div>
      </div>
    </Loadable>
  );
};

export default AskAmirhosseinRecentQuestions;
