export type ID = string | number;

export type UserActionMenuItem = {
  title: string;
  link?: string;
  callback?: React.MouseEventHandler<HTMLElement>;
  icon: JSX.Element;
};

export type SkeletonAnimation = "wave" | "pulse" | false;
