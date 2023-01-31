import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faMessage,
  faPersonChalkboard,
  faQuestion,
  faSackDollar,
  faServer,
  faUserGroup,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import zeenzenLogo from '../assets/images/zeenzen-logo.png';
import { useAppDispatch } from '../hooks/useAppDispatch';
import {
  selectActiveMenuCover,
  SET_ACTIVE_MENU,
  SET_ACTIVE_MENU_COVER_POS,
} from '../store/ui';
import { ActiveMenu } from '../types';
import { useRouter } from 'next/router';
import getBaseUrl from '../utils/getBaseUrl';
import { useAppSelector } from '../hooks/useAppSelector';

export const menuItems: { link: ActiveMenu; icon: IconDefinition }[] = [
  {
    link: 'courses',
    icon: faGraduationCap,
  },
  {
    link: 'instructors',
    icon: faPersonChalkboard,
  },
  {
    link: 'users',
    icon: faUserGroup,
  },
  {
    link: 'income-management',
    icon: faSackDollar,
  },
  {
    link: 'questions',
    icon: faQuestion,
  },
  {
    link: 'tickets',
    icon: faMessage,
  },
  {
    link: 'server-health',
    icon: faServer,
  },
];

const MENU_ITEM_PADDING = 'pl-7 pr-5';

const Menu = () => {
  const { asPath } = useRouter();

  const activeMenuCover = useAppSelector(selectActiveMenuCover);

  const dispatch = useAppDispatch();

  const handleChangeMenu =
    (link: ActiveMenu) => (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      console.log('event: ', e);
      dispatch(SET_ACTIVE_MENU(link));
      dispatch(SET_ACTIVE_MENU_COVER_POS({ x: e.clientX, y: e.clientY }));
    };

  const isLinkActive = (link: ActiveMenu) => {
    const baseLink = getBaseUrl(link);

    return (link === 'courses' && baseLink === '') || baseLink === link;
  };

  // sets active menu when pages first loads
  useEffect(() => {
    dispatch(SET_ACTIVE_MENU(getBaseUrl(asPath) as ActiveMenu));
  }, [asPath, dispatch]);

  return (
    <div className="bg-title-black text-white">
      <nav className="py-5">
        <ul className="flex flex-col gap-10">
          <li className={`cursor-pointer ${MENU_ITEM_PADDING}`}>
            <Image src={zeenzenLogo} alt="zeenzen" width={36} height={36} />
          </li>

          {menuItems.map(({ icon, link }) => (
            <li className="text-2xl" key={icon.iconName}>
              <Link
                onClick={handleChangeMenu(link)}
                className={`${MENU_ITEM_PADDING}`}
                href={link}
              >
                <FontAwesomeIcon icon={icon} />
              </Link>
            </li>
          ))}
        </ul>

        <div
          style={{
            top: activeMenuCover.y,
            left: activeMenuCover.x,
            width: 'inherit',
          }}
          className="absolute bg-white rounded-tr-full h-12 rounded-br-full"
        />
      </nav>
    </div>
  );
};

// ${
//                 isLinkActive(link)
//                   ? 'bg-white rounded-tr-full rounded-br-full text-text-black'
//                   : ''
//               }

export default Menu;
