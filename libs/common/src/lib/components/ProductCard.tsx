import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@zeenzen/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartSimple,
  faClock,
  faListUl,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

import Property from './Property';
import AppButton from './AppButton';
import { makePriceCleaner, courseLevelTranslator } from '../utils';

type Size = 'sm' | 'default';

export interface ProductCardProps extends Course {
  size?: Size;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

type ActOnSm = <T extends string | number>(
  size: Size,
  smAct: T,
  defaultAct: T
) => T;

const actOnSm: ActOnSm = (size, smAct, defaultAct) => {
  return size === 'sm' ? smAct : defaultAct;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  image,
  hoursCount,
  lecturesCount,
  level,
  participantsCount,
  price,
  onMouseEnter,
  onMouseLeave,
  size = 'default',
}) => {
  const singleCourseLink = `/shop/course/${id}`;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`shadow-mild-shadow rounded-xl max-w-lg w-fit overflow-hidden`}
    >
      <div className="overflow-hidden rounded-t-xl">
        <Image
          width={actOnSm(size, 278.94 * 1.2, 450)}
          height={actOnSm(size, 196 * 1.2, 400)}
          src={image.image}
          alt={title}
        />
      </div>

      <div className="px-5 pt-3">
        <Link href={singleCourseLink}>
          <h2
            className={`font-black ${actOnSm(
              size,
              'text-xl',
              'text-2xl'
            )} text-title-black`}
          >
            {title}
          </h2>
        </Link>

        <div className={`flex gap-12 mt-4 ${actOnSm(size, 'text-sm', '')}`}>
          <div className="flex flex-col justify-between gap-[0.6rem]">
            <Property
              renderIcon={<FontAwesomeIcon icon={faClock} />}
              text="ساعت"
              property={hoursCount}
            />
            <Property
              renderIcon={<FontAwesomeIcon icon={faChartSimple} />}
              text={courseLevelTranslator(level)}
            />
          </div>
          <div className="flex flex-col justify-between gap-[0.6rem]">
            <Property
              renderIcon={<FontAwesomeIcon icon={faListUl} />}
              text="قسمت"
              property={lecturesCount}
            />
            <Property
              renderIcon={<FontAwesomeIcon icon={faUsers} />}
              text="شرکت کننده"
              property={participantsCount}
            />
          </div>
        </div>
      </div>

      <div
        className={`flex items-center justify-between px-5 py-4 ${actOnSm(
          size,
          'mt-2',
          'mt-3'
        )}`}
      >
        <div
          className={`flex items-center gap-1 text-light-blue font-extrabold ${actOnSm(
            size,
            'text-xl',
            'text-2xl'
          )}`}
        >
          <p>{makePriceCleaner(price)}</p>
          <p>تومان</p>
        </div>
        <div className={actOnSm(size, 'scale-90', 'scale-100')}>
          <AppButton link href={singleCourseLink}>
            <span className="font-black text-sm">مشاهده و ثبت نام</span>
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
