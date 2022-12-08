import React, { useMemo } from 'react';
import { AskAmirhossein, AskAmirhosseinAnswer } from '@zeenzen/data';
import { AppLink, getJalaliDate } from '@zeenzen/common';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LINKS } from '../constants/links';

interface AskAmirhosseinQuestionProps
  extends Pick<
    AskAmirhossein,
    'id' | 'title' | 'description' | 'createdAt' | 'fullName'
  > {
  answers?: Pick<AskAmirhosseinAnswer, 'id'>[] | null;
}

const AskAmirhosseinQuestion: React.FC<AskAmirhosseinQuestionProps> = ({
  id,
  title,
  description,
  createdAt,
  fullName,
  answers,
}) => {
  const isAnswered = useMemo(() => answers && answers.length > 0, [answers]);

  return (
    <div className="md:px-10 pt-8 md:pb-5 px-8 pb-3 rounded-xl border border-gray-200 relative">
      <div className="flex items-center justify-between absolute md:px-8 px-3 top-0 right-0 left-0 -translate-y-1/2">
        <h3 className="flex items-center gap-1 leading-[0] bg-white md:p-3 p-2 text-lg font-semibold text-green-500">
          <FontAwesomeIcon icon={faCircleQuestion} className="aspect-square" />
          <span>{title}</span>
        </h3>

        <div className="flex gap-3 items-center">
          <p
            className={`hidden md:block px-5 py-1 rounded-full bg-white ${
              isAnswered ? 'bg-green-500' : 'bg-red-500'
            } text-white text-sm`}
          >
            {isAnswered ? (
              <span>جوابشو گرفته 🙂</span>
            ) : (
              <span>جوابشو نگرفته هنوز ☹️</span>
            )}
          </p>

          <p className="hidden md:block px-5 py-1 rounded-full bg-gray-800/90 text-white text-sm">
            <span>{getJalaliDate(createdAt).format('YYYY/MM/DD')}</span>
          </p>
        </div>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 rotate-90">
        <p className="md:hidden px-4 py-1 rounded-full bg-gray-800/90 text-white text-[0.8rem]">
          <span>{getJalaliDate(createdAt).format('YYYY/MM/DD')}</span>
        </p>
      </div>

      <p className="md:text-base text-sm leading-loose">{description}</p>

      <div className="w-full flex gap-2 items-center justify-end mt-4 text-[0.9rem] md:text-base">
        <AppLink
          text="مشاهده سوال و پاسخ"
          href={LINKS.ASK_AMIRHOSSEIN.QUESTIONS.SINGLE_QUESTION(id)}
        />
      </div>
    </div>
  );
};

export default AskAmirhosseinQuestion;
