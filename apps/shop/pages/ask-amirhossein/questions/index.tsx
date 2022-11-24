import { useState } from 'react';
import { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useAskAmirhosseinsQuery } from '@zeenzen/data';
import { graphqlClient, Pagination } from '@zeenzen/common';

import { NextPageWithLayout } from '../../_app';
import ShopLayout from '../../../src/layouts/ShopLayout';
import AskAmirhosseinQuestion from '../../../src/common/AskAmirhosseinQuestion';

const AskAmirhosseinQuestionsPage: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);

  const { data, error } = useAskAmirhosseinsQuery(
    graphqlClient,
    {
      page,
    },
    {
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <h1 className="font-extrabold text-3xl text-title-black">
        تمامی سوالاتی که شما پرسیده اید
      </h1>

      <div className="space-y-10 mt-16">
        {data?.paginatedAskAmirhosseins?.askAmirhosseins.map(
          (askAmirhossein) => (
            <AskAmirhosseinQuestion
              key={askAmirhossein.id}
              {...askAmirhossein}
            />
          )
        )}
      </div>

      <div className="flex justify-center mt-12">
        <Pagination
          pagesCount={data?.paginatedAskAmirhosseins?.totalPages || 1}
          activePage={page}
          hasNext={data?.paginatedAskAmirhosseins?.hasNext}
          hasPrev={data?.paginatedAskAmirhosseins?.hasPrev}
          onClick={(page) => setPage(page)}
          onNext={() => setPage((currPage) => currPage + 1)}
          onPrev={() => setPage((currPage) => currPage - 1)}
        />
      </div>
    </div>
  );
};

AskAmirhosseinQuestionsPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default AskAmirhosseinQuestionsPage;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const vars = {
    page: 1,
  };

  await queryClient.fetchQuery(
    useAskAmirhosseinsQuery.getKey(vars),
    useAskAmirhosseinsQuery.fetcher(graphqlClient, vars)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 8, //8h
  };
};
