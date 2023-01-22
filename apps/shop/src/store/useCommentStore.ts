import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { isProd } from '@zeenzen/common';

interface InitialState {
  isReplyCommentModalOpen: boolean;
  parentCommentId: number;
  commentContent: string;
  replyContent: string;
}

interface CommentStore extends InitialState {
  closeReplyCommentModal: () => void;
  openReplyCommentModal: (parentCommentId: number) => void;
  setCommentContent: (content: string) => void;
  setReplyContent: (content: string) => void;
  replyComment: (succeeded: boolean) => void;
}

const initialState: InitialState = {
  isReplyCommentModalOpen: false,
  parentCommentId: 0,
  commentContent: '',
  replyContent: '',
};

const useCommentStore = create(
  devtools(
    immer<CommentStore>((set) => ({
      ...initialState,

      closeReplyCommentModal: () => {
        set(
          (comment) => {
            comment.isReplyCommentModalOpen = false;
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'comment/closeCommentReply'
        );
      },

      openReplyCommentModal: (parentCommentId) => {
        set(
          (comment) => {
            comment.isReplyCommentModalOpen = true;
            comment.parentCommentId = parentCommentId;
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'comment/openReplyCommentModal'
        );
      },

      setCommentContent: (content) => {
        set(
          (comment) => {
            comment.commentContent = content;
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'comment/setCommentContent'
        );
      },

      setReplyContent: (content) => {
        set(
          (comment) => {
            comment.replyContent = content;
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'comment/setReplyContent'
        );
      },

      replyComment: (succeeded) => {
        set(
          (comment) => {
            comment.isReplyCommentModalOpen = false;
            comment.parentCommentId = 0;

            if (succeeded) {
              comment.replyContent = '';
            }
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'comment/replyComment'
        );
      },
    })),
    {
      name: 'comment',
      anonymousActionType: 'comment',
      enabled: !isProd(),
    }
  )
);

export default useCommentStore;
