import React from 'react';
import { useAskAmirhosseinsQuery } from '@zeenzen/data';
import {
  AppButton,
  AppLink,
  getJalaliDate,
  graphqlClient,
  Loadable,
} from '@zeenzen/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

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
            ({ question, createdAt, id, answer, email }) => (
              <div
                key={id}
                className="px-8 pb-5 pt-8 rounded-xl border border-gray-200 relative"
              >
                <div className="absolute right-0 left-0 px-5 top-0 -translate-y-1/2 flex justify-between items-center text-title-black">
                  <h4 className="flex items-center gap-1 leading-[0] bg-white p-3">
                    <span>
                      <FontAwesomeIcon
                        icon={faCircleQuestion}
                        className="aspect-square"
                      />
                    </span>

                    <span>پرسیده شده توسط</span>

                    <span>{email}</span>
                  </h4>

                  <p className="text-sm bg-light-red px-5 py-1 rounded-full text-white">
                    <span>پرسیده شده در تاریخ: </span>
                    {getJalaliDate(createdAt).format('YYYY/MM/DD')}
                  </p>
                </div>

                <p className="text-base leading-loose">{question}</p>

                <div className="flex justify-end mt-5">
                  <AppLink
                    href={`/ask-amirhossein/questions/${id}`}
                    text="مشاهده سوال"
                  />
                </div>
              </div>
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
