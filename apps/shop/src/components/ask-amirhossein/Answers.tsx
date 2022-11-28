import React from 'react';
import { AskAmirhosseinQuery } from '@zeenzen/data';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import Answer from './Answer';

interface AnswersProps {
  answers: AskAmirhosseinQuery['askAmirhossein']['answers'];
  questionId: number;
}

const Answers: React.FC<AnswersProps> = ({ answers, questionId }) => {
  const [answersParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div className="space-y-10 mt-16" ref={answersParent}>
      {answers?.map((answer) => (
        <Answer key={answer.id} answer={answer} questionId={questionId} />
      ))}
    </div>
  );
};

export default Answers;
