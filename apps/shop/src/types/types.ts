import { CourseLevel } from '@zeenzen/data';
import { Types } from '@zeenzen/common';

export type ID = string | number;

export type ArrayType<T> = T extends (infer Item)[] ? Item : T;

export type UserActionMenuItem = {
  title: string;
  link?: string;
  callback?: React.MouseEventHandler<HTMLElement>;
  icon: JSX.Element;
};

export type CategoryFilter = Types.SelectItem & {
  type: 'category';
};

export type LevelFilter = Types.SelectItem & {
  value: CourseLevel;
  type: 'level';
};

export type SkeletonAnimation = 'wave' | 'pulse' | false;
