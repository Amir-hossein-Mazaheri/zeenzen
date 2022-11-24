import React from 'react';
import { AskAmirhossein } from '@zeenzen/data';
import { AppLink, getJalaliDate } from '@zeenzen/common';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface AskAmirhosseinQuestionProps extends Omit<AskAmirhossein, 'user'> {}

const AskAmirhosseinQuestion: React.FC<AskAmirhosseinQuestionProps> = ({
  id,
  question,
  createdAt,
  email,
}) => {
  return (
    <div className="px-10 pt-8 pb-5 rounded-xl border border-gray-200 relative">
      <div className="flex items-center justify-between absolute px-8 top-0 right-0 left-0 -translate-y-1/2">
        <p className="flex items-center gap-1 leading-[0] bg-white p-3 text-green-500">
          <FontAwesomeIcon icon={faCircleQuestion} className="aspect-square" />
          <span>پرسیده شده توسط </span>
          <span>{email}</span>
        </p>

        <p className="px-5 py-1 rounded-full bg-red-500 text-white text-sm">
          <span>پرسیده شده در</span>
          <span>{getJalaliDate(createdAt).format('YYYY/MM/DD')}</span>
        </p>
      </div>

      <p>{question}</p>

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
