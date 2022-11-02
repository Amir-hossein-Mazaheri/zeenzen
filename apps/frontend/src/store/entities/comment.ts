import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configStore";

const initialState = {
  isReplyCommentModalOpen: false,
  parentCommentId: "",
  commentContent: "",
  replyContent: "",
};

const comment = createSlice({
  name: "comment",
  initialState,
  reducers: {
    CLOSE_REPLY_COMMENT_MODAL: (store) => {
      store.isReplyCommentModalOpen = false;
      store.parentCommentId = "";
    },
    OPEN_REPLY_COMMENT_MODAL: (
      store,
      action: PayloadAction<{ parentCommentId: string }>
    ) => {
      store.isReplyCommentModalOpen = true;
      store.parentCommentId = action.payload.parentCommentId;
    },
    SET_COMMENT_CONTENT: (
      store,
      action: PayloadAction<{ content: string }>
    ) => {
      store.commentContent = action.payload.content;
    },
    SET_REPLY_CONTENT: (store, action: PayloadAction<{ content: string }>) => {
      store.replyContent = action.payload.content;
    },
    REPLY_COMMENT: (store, action: PayloadAction<{ succeeded: boolean }>) => {
      store.isReplyCommentModalOpen = false;
      store.parentCommentId = "";

      if (action?.payload.succeeded) {
        store.replyContent = "";
      }
    },
  },
});

export const selectComment = (store: RootState) => store.entities.comment;

export const selectIsReplyCommentModalOpen = (store: RootState) =>
  store.entities.comment.isReplyCommentModalOpen;

export const selectReplyContent = (store: RootState) =>
  store.entities.comment.replyContent;

export const selectCommentContent = (store: RootState) =>
  store.entities.comment.commentContent;

export const {
  OPEN_REPLY_COMMENT_MODAL,
  CLOSE_REPLY_COMMENT_MODAL,
  SET_COMMENT_CONTENT,
  SET_REPLY_CONTENT,
  REPLY_COMMENT,
} = comment.actions;

export default comment.reducer;
