import React, { AnchorHTMLAttributes } from "react";
import Link from "next/link";

type LinkSizes = "sm" | "base" | "lg" | "xl" | undefined;

interface AppLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  text: string;
  href?: string;
  size?: LinkSizes;
  type?: "native-link" | "button" | "next-link";
}

const getLinkSize = (size: LinkSizes) => {
  switch (size) {
    case "sm":
      return "text-sm";
    case "base":
      return "text-lg";
    case "lg":
      return "text-xl";
    case "xl":
      return "text-2xl";
    default:
      return "";
  }
};

const AppLink: React.FC<AppLinkProps> = ({
  text,
  href,
  size,
  className,
  type = "next-link",
  ...rest
}) => {
  const LinkProps = {
    className: `relative cursor-pointer inline-block text-light-blue font-black before:content-[""] before:absolute before:right-0 before:left-0 before:top-full before:h-[1.2px] before:w-full before:bg-light-blue before:mt-[3px] ${getLinkSize(
      size
    )} ${className}`,
    href: href || "",
    ...rest,
  };

  if (type === "native-link") {
    return (
      <a target="_blank" {...LinkProps}>
        {text}
      </a>
    );
  } else if (type === "button") {
    return <button {...LinkProps}>{text}</button>;
  } else {
    return (
      <Link {...LinkProps}>
        <a>
          <p className={LinkProps.className}>{text}</p>
        </a>
      </Link>
    );
  }
};

export default AppLink;
