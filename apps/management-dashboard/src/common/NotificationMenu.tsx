import React from 'react';
import { Menu } from '@headlessui/react';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppSelector } from '../hooks/useAppSelector';

const NotificationMenu = () => {
  const { unreadNotifications } = useAppSelector(
    (store) => store.entities.notifications
  );

  return (
    <Menu>
      <Menu.Button className="relative">
        {unreadNotifications && (
          <div className="absolute top-0 right-0 w-3 aspect-square bg-light-red rounded-full" />
        )}

        <FontAwesomeIcon icon={faBell} size="xl" />
      </Menu.Button>

      <Menu.Items></Menu.Items>
    </Menu>
  );
};

export default NotificationMenu;
