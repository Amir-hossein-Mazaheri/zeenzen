import React, { useEffect, useRef } from 'react';
import { useCommentsQuery } from '@zeenzen/data';
import { graphqlClient, Comment, Loadable, ShadowBox } from '@zeenzen/common';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import PostComment from './PostComment';
import ReplyCommentModal from './ReplyCommentModal';
import useUser from '../../hooks/useUser';
import useCommentStore from '../../hooks/store/useCommentStore';

interface CommentsProps {
  courseId: string;
}

const Comments: React.FC<CommentsProps> = ({ courseId }) => {
  const { isAuthenticated } = useUser();

  const commentsRef = useRef<HTMLDivElement>(null);

  const entry = useIntersectionObserver(commentsRef, {});

  const {
    data,
    isLoading,
    error,
    refetch: refetchComments,
  } = useCommentsQuery(
    graphqlClient,
    {
      courseId,
    },
    { enabled: false }
  );

  const openReplyCommentModal = useCommentStore(
    (state) => state.openReplyCommentModal
  );

  // fetches the comments when scroll reaches comments section
  useEffect(() => {
    if (entry?.isIntersecting) {
      refetchComments();
    }
  }, [entry?.isIntersecting, refetchComments]);

  return (
    <div ref={commentsRef} className="space-y-24">
      <PostComment courseId={courseId} />

      <ShadowBox title="دیدگاه ها" titleSize="lg" className="py-12">
        <Loadable isLoading={isLoading}>
          <div className="space-y-16">
            {data?.comments.map((comment) => (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <Comment
                key={comment.id}
                onReply={() => openReplyCommentModal(comment.id)}
                isAuthenticated={isAuthenticated}
                {...comment}
              />
            ))}
          </div>
        </Loadable>
      </ShadowBox>

      <ReplyCommentModal />
    </div>
  );
};

export default Comments;
