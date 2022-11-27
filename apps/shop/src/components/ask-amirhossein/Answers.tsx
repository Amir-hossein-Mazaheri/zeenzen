import React from 'react';
import {
  Avatar,
  getJalaliDate,
  MarkDown,
  userRoleTranslator,
} from '@zeenzen/common';
import { AskAmirhosseinQuery } from '@zeenzen/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

interface AnswersProps {
  answers: AskAmirhosseinQuery['askAmirhossein']['answers'];
}

const Answers: React.FC<AnswersProps> = ({ answers }) => {
  return (
    <div className="space-y-10 mt-16">
      {answers?.map((answer) => (
        <div key={answer.id} className="flex items-center gap-7">
          <div className="grow shadow-mild-shadow px-10 py-4 rounded-xl bg-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar
                  image={answer.whoAnswered.avatar?.fullPath}
                  width={35}
                />

                <p className="font-semibold text-title-black">
                  <span>{answer.fullName}</span>
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span className="bg-light-blue px-5 py-1 text-white rounded-full">
                  {userRoleTranslator(answer.whoAnswered.role)}
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

          <div className="text-red-500">
            <div className="text-5xl cursor-pointer">
              <FontAwesomeIcon icon={faHeartFilled} />
            </div>

            <p className="text-center font-bold text-lg">
              <span>{answer.likesCount}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Answers;
