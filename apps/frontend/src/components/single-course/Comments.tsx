import React, { useEffect, useRef } from 'react';
import { useCommentsQuery } from '@zeenzen/data';

import graphqlClient from '../../api/graphql-client';
import Comment from '../../common/Comment';
import Loadable from '../../common/Loadable';
import ShadowBox from '../../common/ShadowBox';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import PostComment from './PostComment';
import ReplyCommentModal from './ReplyCommentModal';

interface CommentsProps {
  courseId: string;
}

const Comments: React.FC<CommentsProps> = ({ courseId }) => {
  const commentsRef = useRef<HTMLDivElement>(null);

  const entry = useIntersectionObserver(commentsRef, {});

  const { data, isLoading, error, refetch } = useCommentsQuery(
    graphqlClient,
    {
      courseId,
    },
    { enabled: false }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      console.log('reached comment section.');
      refetch();
    }
  }, [entry?.isIntersecting, refetch]);

  return (
    <div ref={commentsRef} className="space-y-24">
      <PostComment courseId={courseId} />

      <ShadowBox title="دیدگاه ها" titleSize="lg" className="py-12">
        <Loadable isLoading={isLoading}>
          <div className="space-y-16">
            {data?.comments.map((comment) => (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <Comment key={comment.id} {...comment} />
            ))}
          </div>
        </Loadable>
      </ShadowBox>

      <ReplyCommentModal />
    </div>
  );
};

export default Comments;
