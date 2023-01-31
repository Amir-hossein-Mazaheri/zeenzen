import { createSlice } from '@reduxjs/toolkit';

interface Notification {
  message: string;
}

const notificationsContent: Notification[] = [];

const initialState = {
  unreadNotifications: false,

  notifications: notificationsContent,
};

const notifications = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    UNREAD_NOTIFICATION: (store) => {
      store.unreadNotifications = true;
    },
    NO_UNREAD_NOTIFICATION: (store) => {
      store.unreadNotifications = false;
    },
  },
});

export default notifications.reducer;

export const { UNREAD_NOTIFICATION, NO_UNREAD_NOTIFICATION } =
  notifications.actions;
