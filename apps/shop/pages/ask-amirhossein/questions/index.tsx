import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useAskAmirhosseinsQuery } from '@zeenzen/data';
import { Alert, AppButton, graphqlClient, Pagination } from '@zeenzen/common';

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
      <div className="flex items-center justify-between">
        <h1 className="font-extrabold text-3xl text-title-black">
          تمامی سوالاتی که شما پرسیده اید
        </h1>

        <AppButton link href="/ask-amirhossein/#question-form" rounded outline>
          <span>سوال بپرس 🤔</span>
        </AppButton>
      </div>

      <Alert color="warn" className="mt-10 px-12 py-4" rounded>
        <span>
          توجه: این صفحه هر 8 ساعت یکبار آپدیت می شود پس اگه سوال شما تایید شده
          و در این صفحه نیست نگران نباشید بزودی سوال شما در این صفحه قرار می
          گیرد.
        </span>
      </Alert>

      <Alert color="info" className="mt-5 px-12 py-4" rounded>
        <span>
          برای پاسخ به هریک از سوالات بر روی <b>مشاهده سوال و پاسخ</b> کلیک
          کنید.
        </span>
      </Alert>

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
