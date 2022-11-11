import React, { useEffect } from 'react';
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

interface NavbarProps {
  className?: string;
}

const pages = [
  {
    title: 'خانه',
    link: '/',
  },
  {
    title: 'فروشگاه',
    link: '/shop',
  },
  {
    title: 'درباره من',
    link: '/about-me',
  },
  {
    title: 'راه های ارتباطی',
    link: '/contact-us',
  },
  {
    title: 'از امیرحسین بپرس',
    link: '/ask-amirhossein',
  },
];

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { isAuthenticated, user } = useUser();
  const { items, type, id: cartId, refetchCart } = useCart();

  const { route } = useRouter();

  const removeCartItem = useRemoveCartItem({
    cartId,
    refetchCart,
    type,
  });

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
            <li className={link === route ? 'text-light-blue' : ''} key={title}>
              <Link href={link}>{title}</Link>
            </li>
          ))}
        </ul>

        <ul className="flex gap-6 items-center">
          <li>
            <CartIcon items={items || []} onRemoveCartItem={removeCartItem} />
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
                <Link href="/signin">ورود</Link>
              </li>
              <li>
                <AppButton link rounded href="/signup">
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

export default Navbar;
