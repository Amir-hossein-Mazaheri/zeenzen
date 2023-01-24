import React from 'react';
import { useRouter } from 'next/router';
import { useSingleQuestionHubQuery } from '@zeenzen/data';
import { graphqlClient, Loadable } from '@zeenzen/common';

import { NextPageWithLayout } from '../../_app';
import ShopLayout from '../../../src/layouts/ShopLayout';
import useProtectedRoute from '../../../src/hooks/useProtectedRoute';
import AskAmirhosseinQuestion from '../../../src/common/AskAmirhosseinQuestion';

const SingleQuestionHubPage: NextPageWithLayout = () => {
  useProtectedRoute();

  const { query } = useRouter();

  const { data, isLoading, error } = useSingleQuestionHubQuery(graphqlClient, {
    questionHubInput: {
      id: query?.questionHubId?.toString() ?? '',
    },
  });

  return (
    <div>
      <Loadable isLoading={isLoading} error={String(error)}>
        <div>
          {data?.questionHub.questions.map((question) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
