import React, { useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import {
  Exact,
  FindOneAskAmirhosseinInput,
  useAskAmirhosseinQuery,
  useAskAmirhosseinsQuery,
} from '@zeenzen/data';
import {
  AppLink,
  getJalaliDate,
  graphqlClient,
  Loadable,
  MarkDown,
  useBreadcrumbs,
} from '@zeenzen/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { NextPageWithLayout } from '../../_app';
import ShopLayout from '../../../src/layouts/ShopLayout';
import addToTitle from '../../../src/utils/addToTitle';
import SendAnswerForm from '../../../src/components/ask-amirhossein/SendAnswerForm';
import Answers from '../../../src/components/ask-amirhossein/Answers';
import { Breadcrumbs } from '../../../../../libs/common/src/lib/components/Breadcrumbs';

const keyResolvers = new Map();
keyResolvers.set('questionId', 'سوال');

const SingleAskAmirhosseinQuestionPage: NextPageWithLayout = () => {
  const { query, isFallback, asPath, pathname } = useRouter();

  const crumbs = useBreadcrumbs(asPath, pathname, keyResolvers);

  const questionId = useMemo(() => Number(query.questionId) ?? 1, [query]);

  const { data, error } = useAskAmirhosseinQuery(graphqlClient, {
    askAmirhosseinInput: {
      id: questionId,
    },
  });

  const isAnswered = useMemo(
    () =>
      data?.askAmirhossein.answers && data?.askAmirhossein.answers.length > 0,
    [data?.askAmirhossein.answers]
  );

  return (
    <>
      <Head>
        <title>{addToTitle(data?.askAmirhossein.title ?? '')}</title>
      </Head>

      <Loadable isLoading={isFallback}>
        <div className="w-[95%] mx-auto">
          <Breadcrumbs crumbs={crumbs} />

          <h1 className="font-extrabold text-5xl mb-9 text-title-black">
            {data?.askAmirhossein.title}
          </h1>

          <div className="flex justify-between items-center mb-10 px-7 font-medium text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <div className="leading-[0] flex items-center justify-center p-2 border border-gray-500 text-gray-500 rounded-full">
                <FontAwesomeIcon icon={faUser} />
              </div>

              <span>{data?.askAmirhossein.fullName}</span>
            </div>

            <div className="flex gap-3 items-center">
              <div
                className={`rounded-full px-5 py-1 text-white ${
                  isAnswered ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {isAnswered ? (
                  <span>جوابشو گرفته 🙂</span>
                ) : (
                  <span>جوابشو هنوز نگرفته ☹️</span>
                )}
              </div>

              <div className="border border-gray-300 rounded-full px-5 py-1">
                <span>پرسیده شده در: </span>

                <span>
                  {getJalaliDate(data?.askAmirhossein.createdAt).format(
                    'YYYY/MM/DD'
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="shadow-mild-shadow rounded-lg px-12 py-6">
            <div className="prose min-w-full leading-[2.3] text-text-black">
              <MarkDown markdown={data?.askAmirhossein.description ?? ''} />
            </div>

            <div className="mt-6 flex justify-end">
              <AppLink text="جوابشو بده" href="#answer-form" />
            </div>
          </div>

          {isAnswered && (
            <Answers
              answers={data?.askAmirhossein.answers ?? []}
              questionId={questionId}
            />
          )}

          <SendAnswerForm questionId={questionId} />
        </div>
      </Loadable>
    </>
  );
};

SingleAskAmirhosseinQuestionPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default SingleAskAmirhosseinQuestionPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const queryClient = new QueryClient();

  const questionId = Number(ctx.params?.questionId) ?? 1;

  const vars: Exact<{ askAmirhosseinInput: FindOneAskAmirhosseinInput }> = {
    askAmirhosseinInput: {
      id: questionId,
    },
  };

  try {
    await queryClient.fetchQuery(
      useAskAmirhosseinQuery.getKey(vars),
      useAskAmirhosseinQuery.fetcher(graphqlClient, vars)
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: 60 * 60 * 24, //24h
    };
  } catch (e) {
    console.log(e);

    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths:
      //TODO: this should fetch all but fetching first 15, and also in future we should not cache every question if count goes up
      (
        await useAskAmirhosseinsQuery.fetcher(graphqlClient)()
      ).paginatedAskAmirhosseins.askAmirhosseins.map(({ id }) => ({
        params: {
          questionId: id,
        },
      })),
    fallback: true,
  };
};
