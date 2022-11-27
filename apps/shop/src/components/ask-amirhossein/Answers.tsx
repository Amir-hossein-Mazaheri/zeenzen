import React from 'react';
import { AskAmirhosseinQuery } from '@zeenzen/data';

import Answer from './Answer';

interface AnswersProps {
  answers: AskAmirhosseinQuery['askAmirhossein']['answers'];
  questionId: number;
}

const Answers: React.FC<AnswersProps> = ({ answers, questionId }) => {
  return (
    <div className="space-y-10 mt-16">
      {answers?.map((answer) => (
        <Answer key={answer.id} answer={answer} questionId={questionId} />
      ))}
    </div>
  );
};

export default Answers;
