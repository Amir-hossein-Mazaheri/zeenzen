import React, { memo, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AppButton,
  CartIcon,
  Conditional,
  TrueCondition,
  FalseCondition,
  parseUrl,
  HamburgerMenu,
  Drawer,
} from '@zeenzen/common';

import useUser from '../hooks/useUser';
import ProfileMenu from '../components/user/ProfileMenu';
import useCart from '../hooks/useCart';
import useRemoveCartItem from '../hooks/useRemoveCartItem';
import useCartStore from '../store/useCartStore';
import { LINKS } from '../constants/links';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface NavbarProps {
  className?: string;
}

const pages = [
  {
    title: 'خانه',
    link: LINKS.INDEX,
  },
  {
    title: 'فروشگاه',
    link: LINKS.SHOP.INDEX,
  },
  {
    title: 'درباره من',
    link: LINKS.ABOUT_ME,
  },
  {
    title: 'راه های ارتباطی',
    link: LINKS.CONTACT_US,
  },
  {
    title: 'از امیرحسین بپرس',
    link: LINKS.ASK_AMIRHOSSEIN.INDEX,
  },
  {
    title: 'سوالات ترجمه شده StackOverflow',
    link: LINKS.STACK_OVERFLOW.INDEX,
  },
];

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { isAuthenticated, user } = useUser();
  const { items, type, id: cartId, refetchCart, isFetching } = useCart();

  const { asPath } = useRouter();

  const removeCartItem = useRemoveCartItem({
    cartId,
    refetchCart,
    type,
  });

  const isLinkActive = useCallback(
    (link: string) => link === '/' + parseUrl(asPath)[0],
    [asPath]
  );

  const loadCartItems = useCartStore((state) => state.loadCartItems);

  // loads cart items from localStorage
  useEffect(() => {
    loadCartItems();
  }, [loadCartItems]);

  return (
    <>
      <Drawer
        show={showMobileMenu}
        className="max-w-[70vw] z-50 px-4 pb-5 pt-8 text-[0.7rem]"
      >
        <div
          onClick={() => setShowMobileMenu(false)}
          className="absolute top-2 right-0 translate-x-1/2 rounded-full bg-red-500 text-white p-1 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faClose} />
        </div>

        <ul className="space-y-3">
          {pages.map(({ title, link }) => (
            <li key={link}>
              <Link
                href={link}
                onClick={() => setShowMobileMenu(false)}
                className="block py-4 px-5 border border-gray-200 text-text-black hover:border-white hover:text-white hover:bg-red-500 transition-colors rounded-xl"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </Drawer>

      <div className={`sticky top-4 w-full text-text-black z-40 ${className}`}>
        <nav className="flex justify-between items-center font-black md:text-lg md:py-3 md:px-8 py-2 px-5 bg-white shadow-spread-shadow rounded-full">
          <ul className="md:flex gap-12 hidden">
            {pages.map(({ title, link }) => (
              <li
                className={isLinkActive(link) ? 'text-light-blue' : ''}
                key={link}
              >
                <Link href={link}>{title}</Link>
              </li>
            ))}
          </ul>

          <HamburgerMenu
            show={showMobileMenu}
            onClick={() => setShowMobileMenu((currShow) => !currShow)}
            className="text-gray-600 md:hidden scale-75"
          />

          <ul className="flex md:gap-6 gap-5 items-center">
            <li>
              <CartIcon
                items={items || []}
                isFetching={isFetching || false}
                onRemoveCartItem={removeCartItem}
              />
            </li>
            <Conditional condition={isAuthenticated}>
              <TrueCondition>
                <ProfileMenu
                  fullname={
                    user?.firstname && user.lastname
                      ? `${user?.firstname} ${user?.lastname}`
                      : undefined
                  }
                  avatar={user?.avatar?.fullPath}
                />
              </TrueCondition>
              <FalseCondition>
                <li className="md:text-lg">
                  <Link href={LINKS.SIGN_IN}>ورود</Link>
                </li>
                <li>
                  <AppButton link rounded href={LINKS.SIGN_UP}>
                    ثبت نام
                  </AppButton>
                </li>
              </FalseCondition>
            </Conditional>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default memo(Navbar);
