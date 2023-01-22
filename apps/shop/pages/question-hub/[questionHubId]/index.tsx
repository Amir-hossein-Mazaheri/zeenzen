import React from 'react';
import { useRouter } from 'next/router';
import { useSingleQuestionHubQuery } from '@zeenzen/data';
import { graphqlClient, Loadable } from '@zeenzen/common';

import { NextPageWithLayout } from '../../_app';
import ShopLayout from 'apps/shop/src/layouts/ShopLayout';
import useProtectedRoute from 'apps/shop/src/hooks/useProtectedRoute';
import AskAmirhosseinQuestion from 'apps/shop/src/common/AskAmirhosseinQuestion';

const SingleQuestionHubPage: NextPageWithLayout = () => {
  useProtectedRoute();

  const { query } = useRouter();

  const { data, isLoading, error } = useSingleQuestionHubQuery(graphqlClient, {
    questionHubInput: {
      id: Number(query?.questionHubId),
    },
  });

  return (
    <div>
      <Loadable isLoading={isLoading}>
        <div>
          {data?.questionHub.questions.map((question) => (
            // @ts-ignore
            <AskAmirhosseinQuestion key={question.id} {...question} />
          ))}
        </div>
      </Loadable>
    </div>
  );
};

SingleQuestionHubPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default SingleQuestionHubPage;
