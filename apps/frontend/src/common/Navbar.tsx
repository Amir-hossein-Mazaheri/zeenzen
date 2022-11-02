import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import AppButton from "./AppButton";
import CartIcon from "./CartIcon";
import useUser from "../hooks/useUser";
import ProfileMenu from "../components/user/ProfileMenu";
import Conditional from "./Conditional";
import TrueCondition from "./TrueCondition";
import FalseCondition from "./FalseCondition";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { LOAD_ITEMS } from "../store/entities/cart";
import persistCart from "../utils/persistCart";

interface NavbarProps {
  className?: string;
}

const pages = [
  {
    title: "خانه",
    link: "/",
  },
  {
    title: "فروشگاه",
    link: "/shop",
  },
  {
    title: "درباره من",
    link: "/about-me",
  },
  {
    title: "راه های ارتباطی",
    link: "/contact-us",
  },
];

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { isAuthenticated, user } = useUser();
  const { route } = useRouter();

  const dispatch = useAppDispatch();

  // loads cart items from localStorage
  useEffect(() => {
    dispatch(LOAD_ITEMS({ items: persistCart() }));
  }, [dispatch]);

  return (
    <div className={`sticky top-4 w-full text-text-black z-40 ${className}`}>
      <nav className="flex justify-between items-center font-black text-lg py-3 px-8 bg-white shadow-spread-shadow rounded-full">
        <ul className="flex gap-12">
          {pages.map(({ title, link }) => (
            <li className={link === route ? "text-light-blue" : ""} key={title}>
              <Link href={link}>{title}</Link>
            </li>
          ))}
        </ul>

        <ul className="flex gap-6 items-center">
          <li>
            <CartIcon />
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
