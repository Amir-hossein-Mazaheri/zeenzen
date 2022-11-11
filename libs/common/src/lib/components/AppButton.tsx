import React, { MouseEventHandler, useMemo } from 'react';
import Link from 'next/link';
import PuffLoader from 'react-spinners/PuffLoader';

interface AppButtonProps {
  link?: boolean;
  outline?: boolean;
  type?: 'button' | 'reset' | 'submit';
  href?: string;
  className?: string;
  rounded?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  loadingSpinnerSize?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const AppButton: React.FC<AppButtonProps> = ({
  children,
  outline = false,
  type = 'button',
  link = false,
  className,
  href = '/',
  rounded = false,
  disabled = false,
  loading = false,
  loadingSpinnerSize = 30,
  onClick,
}) => {
  const outlineStyle = useMemo(
    () =>
      `border ${
        disabled || loading ? 'border-gray-300' : 'border-light-red'
      } bg-transparent font-black text-light-red`,
    [disabled, loading]
  );

  const defaultStyle = useMemo(
    () =>
      `border-none ${
        disabled || loading
          ? 'bg-gray-300 text-text-black'
          : 'bg-light-red text-white'
      }`,
    [disabled, loading]
  );

  const style = useMemo(
    () =>
      `${outline ? outlineStyle : defaultStyle} ${
        disabled || loading ? 'pointer-events-none' : 'cursor-pointer'
      } outline-none px-8 py-2 text-base ${
        rounded ? 'rounded-full' : 'rounded-[8.73529px]'
      } ${loading ? 'flex justify-center items-center' : ''} ${className}`,
    [className, defaultStyle, disabled, loading, outline, outlineStyle, rounded]
  );

  return link ? (
    <Link href={href} onClick={onClick}>
      {loading ? (
        <PuffLoader size={loadingSpinnerSize} color="#000" />
      ) : (
        <div className={style}>{children}</div>
      )}
    </Link>
  ) : (
    <button disabled={disabled} className={style} type={type} onClick={onClick}>
      {loading ? (
        <PuffLoader size={loadingSpinnerSize} color="#000" />
      ) : (
        children
      )}
    </button>
  );
};

export default AppButton;
