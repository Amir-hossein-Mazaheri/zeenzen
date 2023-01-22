import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { usePostCommentMutation } from '@zeenzen/data';
import {
  graphqlClient,
  AppLink,
  Conditional,
  FalseCondition,
  Loadable,
  ShadowBox,
  TrueCondition,
} from '@zeenzen/common';

import CommentFormSkeleton from '../../common/Skeleton/CommentFormSkeleton';
import useToast from '../../hooks/useToast';
import useUser from '../../hooks/useUser';
import CommentForm, { commentSchema } from './CommentForm';
import useCommentStore from '../../store/useCommentStore';
import { LINKS } from '../../constants/links';

interface PostCommentProps {
  courseId: number;
}

const PostComment: React.FC<PostCommentProps> = ({ courseId }) => {
  const { loading, isAuthenticated } = useUser();

  const postCommentMutation = usePostCommentMutation(graphqlClient);

  const { commentContent, setCommentContent } = useCommentStore(
    ({ commentContent, setCommentContent }) => ({
      commentContent,
      setCommentContent,
    })
  );

  const toast = useToast();

  const handlePostComment: SubmitHandler<
    z.infer<typeof commentSchema>
  > = async ({ content }) => {
    try {
      await postCommentMutation.mutateAsync({
        createCommentInput: {
          content,
          courseId,
        },
      });

      toast({}).fire({
        title: 'دیدگاه شما پس از تایید نمایش داده خواهد شد.',
        icon: 'success',
      });
    } catch (err) {
      //   const errorMessages = err?.messages;
      console.log(err);
      toast({}).fire({
        title: '',
        icon: 'error',
      });
    }
  };

  return (
    <ShadowBox title="ارسال دیدگاه" titleSize="lg" className="pt-12">
      <Loadable
        fragment
        center={false}
        isLoading={loading}
        skeleton={<CommentFormSkeleton />}
      >
        <Conditional condition={isAuthenticated}>
          <TrueCondition>
            <CommentForm
              handleSubmit={handlePostComment}
              defaultValue={commentContent}
              onChange={(event) => setCommentContent(event.target.value)}
            />
          </TrueCondition>
          <FalseCondition>
            <p className="text-center font-medium text-lg">
              <span>برای ارسال دیدگاه باید </span>
              <span>
                <AppLink href={LINKS.SIGN_IN} text="وارد" />{' '}
              </span>
              <span>شوید.</span>
            </p>
          </FalseCondition>
        </Conditional>
      </Loadable>
    </ShadowBox>
  );
};

export default PostComment;
