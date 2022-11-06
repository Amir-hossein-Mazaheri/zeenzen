import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface CommentStore {
  isReplyCommentModalOpen: boolean;
  parentCommentId: string;
  commentContent: string;
  replyContent: string;

  closeReplyCommentModal: () => void;
  openReplyCommentModal: (parentCommentId: string) => void;
  setCommentContent: (content: string) => void;
  setReplyContent: (content: string) => void;
  replyComment: (succeeded: boolean) => void;
}

const useCommentStore = create(
  immer<CommentStore>((set) => ({
    isReplyCommentModalOpen: false,
    parentCommentId: '',
    commentContent: '',
    replyContent: '',

    closeReplyCommentModal: () => {
      set((comment) => {
        comment.isReplyCommentModalOpen = false;
      });
    },

    openReplyCommentModal: (parentCommentId) => {
      set((comment) => {
        comment.isReplyCommentModalOpen = true;
        comment.parentCommentId = parentCommentId;
      });
    },

    setCommentContent: (content) => {
      set((comment) => {
        comment.commentContent = content;
      });
    },

    setReplyContent: (content) => {
      set((comment) => {
        comment.replyContent = content;
      });
    },

    replyComment: (succeeded) => {
      set((comment) => {
        comment.isReplyCommentModalOpen = false;
        comment.parentCommentId = '';

        if (succeeded) {
          comment.replyContent = '';
        }
      });
    },
  }))
);

export default useCommentStore;
