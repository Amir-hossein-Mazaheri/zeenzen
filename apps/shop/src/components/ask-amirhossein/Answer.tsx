import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  Avatar,
  getJalaliDate,
  graphqlClient,
  Loadable,
  MarkDown,
  userRoleTranslator,
} from '@zeenzen/common';
import {
  AskAmirhosseinQuery,
  useAskAmirhosseinQuery,
  useLikeAskAmirhosseinAnswerMutation,
  UserRole,
} from '@zeenzen/data';

import { ArrayType } from '../../types';
import useToast from '../../hooks/useToast';
import getErrorMessages from '../../utils/getErrorMessages';

interface AnswerProps {
  answer: NonNullable<
    ArrayType<AskAmirhosseinQuery['askAmirhossein']['answers']>
  >;
  questionId: number;
}

const Answer: React.FC<AnswerProps> = ({ answer, questionId }) => {
  const { refetch: refetchAskAmirhossein, isRefetching } =
    useAskAmirhosseinQuery(
      graphqlClient,
      {
        askAmirhosseinInput: {
          id: questionId,
        },
      },
      {
        enabled: false,
      }
    );

  const likeAskAmirhosseinAnswerMutation =
    useLikeAskAmirhosseinAnswerMutation(graphqlClient);

  const toast = useToast();

  const handleLikeAskAmirhosseinAnswer = async () => {
    try {
      await likeAskAmirhosseinAnswerMutation.mutateAsync({
        answerId: +answer.id,
      });

      await refetchAskAmirhossein();

      toast().fire({
        title: 'شما این جواب رو لایک کردین 👍',
        icon: 'success',
      });
    } catch (err) {
      getErrorMessages(err).map((message) => {
        toast().fire({
          title: message,
          icon: 'error',
        });
      });
    }
  };

  return (
    <div className="flex items-center gap-7">
      <div className="grow shadow-mild-shadow px-10 py-4 rounded-xl bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar image={answer.whoAnswered.avatar?.fullPath} width={35} />

            <p className="font-semibold text-title-black">
              <span>{answer.fullName}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="bg-light-blue px-5 py-1 text-white rounded-full">
              {userRoleTranslator(
                answer.whoAnswered?.role ?? UserRole.Customer
              )}
            </span>

            <span className="rounded-full border border-gray-300 text-text-black px-5 py-1">
              {getJalaliDate(answer.createdAt).format('YYYY/MM/DD')}
            </span>
          </div>
        </div>

        <div className="prose min-w-full leading-[2.3] text-text-black mt-5 px-5">
          <MarkDown markdown={answer.answer} />
        </div>
      </div>

      <div className="text-red-500" onClick={handleLikeAskAmirhosseinAnswer}>
        <Loadable
          isLoading={likeAskAmirhosseinAnswerMutation.isLoading}
          fragment
        >
          <div className="text-5xl cursor-pointer">
            <FontAwesomeIcon
              icon={answer.likesCount > 0 ? faHeartFilled : faHeart}
            />
          </div>

          <p className="text-center font-bold text-lg">
            <span>{answer.likesCount}</span>
          </p>
        </Loadable>
      </div>
    </div>
  );
};

export default Answer;
