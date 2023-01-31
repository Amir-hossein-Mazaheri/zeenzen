import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartSimple,
  faClock,
  faListUl,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Course } from '@zeenzen/data';

import AppButton from './AppButton';
import Property from './Property';
import PriceTag from './PriceTag';
import { courseLevelTranslator } from '../utils';

export interface CourseCardProps
  extends Pick<
    Course,
    | 'id'
    | 'title'
    | 'shortDescription'
    | 'level'
    | 'price'
    | 'hoursCount'
    | 'lecturesCount'
    | 'participantsCount'
  > {
  className?: string;
  image: Course['image']['image'];
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  shortDescription,
  level,
  price,
  hoursCount,
  lecturesCount,
  participantsCount,
  className,
  image,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl flex items-stretch border border-light-gray overflow-hidden ${className}`}
    >
      <div>
        <Image
          src={image}
          alt={title}
          width={150}
          height={150}
          className="aspect-square object-cover object-center"
        />
      </div>

      <div className="px-8 py-3 grow flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-title-black">{title}</h3>

          <AppButton
            link
            href={`/courses/edit/${id}`}
            roundness="rounded-xl"
            py="py-[0.3rem]"
            className="text-[0.6rem]"
          >
            <span className="font-medium text-sm">ویرایش دوره</span>
          </AppButton>
        </div>

        <div className="leading-loose max-w-2xl">
          <p>{shortDescription}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-9">
            <Property
              renderIcon={<FontAwesomeIcon icon={faClock} />}
              text="ساعت"
              property={hoursCount}
            />

            <Property
              renderIcon={<FontAwesomeIcon icon={faChartSimple} />}
              text={courseLevelTranslator(level)}
            />

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

          <PriceTag
            price={price}
            fontSize="text-lg"
            color="text-light-blue"
            mb="m-0"
          />
        </div>
      </div>
    </div>
  );
};
