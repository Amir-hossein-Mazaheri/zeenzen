import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { usePostCommentMutation } from '@zeenzen/data';

import graphqlClient from '../../../../../libs/common-component/src/lib/api/graphql-client';
import AppLink from '../../common/AppLink';
import Conditional from '../../common/Conditional';
import FalseCondition from '../../common/FalseCondition';
import Loadable from '../../common/Loadable';
import ShadowBox from '../../common/ShadowBox';
import CommentFormSkeleton from '../../common/Skeleton/CommentFormSkeleton';
import TrueCondition from '../../common/TrueCondition';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import useToast from '../../hooks/useToast';
import useUser from '../../hooks/useUser';
import {
  selectCommentContent,
  SET_COMMENT_CONTENT,
} from '../../store/entities/comment';
import CommentForm, { CommentFormFields } from './CommentForm';

interface PostCommentProps {
  courseId: string;
}

const PostComment: React.FC<PostCommentProps> = ({ courseId }) => {
  const { loading, isAuthenticated } = useUser();

  const commentContent = useAppSelector(selectCommentContent);

  const postCommentMutation = usePostCommentMutation(graphqlClient);

  const dispatch = useAppDispatch();

  const toast = useToast();

  const handlePostComment: SubmitHandler<CommentFormFields> = async ({
    content,
  }) => {
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
              onChange={(event) =>
                dispatch(SET_COMMENT_CONTENT({ content: event.target.value }))
              }
            />
          </TrueCondition>
          <FalseCondition>
            <p className="text-center font-medium text-lg">
              <span>برای ارسال دیدگاه باید </span>
              <span>
                <AppLink href="/signin" text="وارد" />{' '}
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
