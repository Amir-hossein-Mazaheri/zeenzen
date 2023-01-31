import React from 'react';

import { selectNavbarTitle } from '../store/ui';
import { useAppSelector } from '../hooks/useAppSelector';
import NotificationMenu from './NotificationMenu';
import AvatarMenu from './AvatarMenu';

const Navbar = () => {
  const title = useAppSelector(selectNavbarTitle);

  return (
    <div className="flex items-center justify-between py-5 px-8 border-b border-light-gray">
      <div>
        <h1 className="text-2xl font-extrabold text-title-black">{title}</h1>
      </div>

      <div className="flex items-center gap-6">
        <NotificationMenu />

        <AvatarMenu />
      </div>
    </div>
  );
};

export default Navbar;
