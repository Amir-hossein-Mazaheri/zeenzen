import React, { useMemo } from 'react';
import { AskAmirhossein, AskAmirhosseinAnswer } from '@zeenzen/data';
import { AppLink, getJalaliDate } from '@zeenzen/common';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    <div className="px-10 pt-8 pb-5 rounded-xl border border-gray-200 relative">
      <div className="flex items-center justify-between absolute px-8 top-0 right-0 left-0 -translate-y-1/2">
        <h3 className="flex items-center gap-1 leading-[0] bg-white p-3 text-lg font-semibold text-green-500">
          <FontAwesomeIcon icon={faCircleQuestion} className="aspect-square" />

        </h3>

        <div className="flex gap-3 items-center">
          <p
            className={`px-5 py-1 rounded-full bg-white ${
              isAnswered ? 'bg-green-500' : 'bg-red-500'
            } text-white text-sm`}
          >
            {isAnswered ? (
              <span>جوابشو گرفته 🙂</span>
            ) : (
              <span>جوابشو نگرفته هنوز ☹️</span>
            )}
          </p>

          <p className="px-5 py-1 rounded-full bg-gray-800/90 text-white text-sm">
            <span>{getJalaliDate(createdAt).format('YYYY/MM/DD')}</span>
          </p>
        </div>
      </div>

      <p>{description}</p>

      <div className="flex justify-end mt-4">
        <AppLink
          text="مشاهده سوال و پاسخ"
          href={`/ask-amirhossein/questions/${id}`}
        />
      </div>
    </div>
  );
};

export default AskAmirhosseinQuestion;
