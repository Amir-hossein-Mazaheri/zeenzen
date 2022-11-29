import React, { memo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AppButton,
  CartIcon,
  Conditional,
  TrueCondition,
  FalseCondition,
} from '@zeenzen/common';

import useUser from '../hooks/useUser';
import ProfileMenu from '../components/user/ProfileMenu';
import useCart from '../hooks/useCart';
import useRemoveCartItem from '../hooks/useRemoveCartItem';
import useCartStore from '../store/useCartStore';
import { LINKS } from '../constants/links';
import parseUrl from '../utils/parseUrl';

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
    <div className={`sticky top-4 w-full text-text-black z-40 ${className}`}>
      <nav className="flex justify-between items-center font-black text-lg py-3 px-8 bg-white shadow-spread-shadow rounded-full">
        <ul className="flex gap-12">
          {pages.map(({ title, link }) => (
            <li
              className={isLinkActive(link) ? 'text-light-blue' : ''}
              key={title}
            >
              <Link href={link}>{title}</Link>
            </li>
          ))}
        </ul>

        <ul className="flex gap-6 items-center">
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
              <li className="text-lg">
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
  );
};

export default memo(Navbar);
