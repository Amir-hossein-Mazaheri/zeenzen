import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Avatar } from '@zeenzen/common';

import { userActions } from '../user-dashboard/Sidebar';
import { useRouter } from 'next/router';
import useLogout from '../../hooks/useLogout';

interface ProfileMenuProps {
  fullname?: string;
  avatar?: string;
  direction?: 'right' | 'left';
}

const menuItems = userActions.slice(1);

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  fullname,
  avatar,
  direction = 'left',
}) => {
  const router = useRouter();

  const logout = useLogout();

  return (
    <Menu as="li" className="h-12">
      <Menu.Button className="flex gap-2 items-center">
        <Avatar image={avatar} height={48} width={48} />
        {fullname && <p className="font-semibold text-sm">{fullname}</p>}
      </Menu.Button>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className={`space-y-2 outline-none absolute overflow-hidden top-full p-2 ${
            direction === 'left' ? '-left-4' : 'right-0'
          } mt-4 bg-white shadow-md shadow-gray-300/80 rounded-xl min-w-[14rem] text-gray-500 font-medium text-sm`}
        >
          {menuItems.map(({ title, icon, link }) => (
            <Menu.Item key={title}>
              {({ active }) => (
                <div
                  className={`flex gap-1 items-center pl-8 pr-3 py-3 cursor-pointer rounded-lg ${
                    active ? 'bg-light-red  text-white' : ''
                  }`}
                  onClick={() => {
                    console.log('link: ', link, title);
                    if (link) {
                      return router.push(link);
                    }

                    logout();
                  }}
                >
                  <span>{icon}</span>
                  <span>{title}</span>
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileMenu;
