import React from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTableColumns,
  faUsers,
  faChalkboardUser,
  faStar,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import { UserActionMenuItem } from '../../types';
import useLogout from '../../hooks/useLogout';

export const userActions: UserActionMenuItem[] = [
  {
    title: 'داشبرد',
    link: '/',
    icon: <FontAwesomeIcon icon={faTableColumns} />,
  },
  {
    title: 'پروفایل من',
    link: '/profile',
    icon: <FontAwesomeIcon icon={faUsers} />,
  },
  {
    title: 'دوره های من',
    link: '/courses',
    icon: <FontAwesomeIcon icon={faChalkboardUser} />,
  },
  {
    title: 'امتیاز های من',
    link: '/scores',
    icon: <FontAwesomeIcon icon={faStar} />,
  },
  {
    title: 'خروج از حساب کاربری',
    icon: <FontAwesomeIcon icon={faRightFromBracket} />,
  },
].map((action) => {
  if (action.link) {
    action.link = `/user/dashboard${action.link !== '/' ? action.link : ''}`;
  }
  return action;
});

const Sidebar = () => {
  const router = useRouter();

  const logout = useLogout();

  console.log(router);

  return (
    <div className="basis-1/5 shadow-spread-shadow pr-7 pl-12 py-6 rounded-xl">
      <nav>
        <ul className="space-y-8 font-medium">
          {userActions.map(({ title, link, icon }) => (
            <li
              className={link && link === router.route ? 'text-red-500' : ''}
              key={link}
            >
              <div
                onClick={() => {
                  if (link) {
                    return router.push(link);
                  }

                  logout();
                }}
              >
                <p className="flex gap-2 items-center cursor-pointer">
                  <span>{icon}</span>
                  <span>{title}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
