import { ReactNode } from 'react';

export type CartItem = {
  id: number;
  title: string;
  thumbnail: string;
  instructors: string[];
  price: string;
  discountedPrice: number;
};

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
  isOpen: boolean;
};

export type SelectItem = {
  id: string;
  text: string;
  value: string | number;
};

export type Crumb = {
  text: string;
  href: string;
};

export type ObjectKey = string | number | symbol;

export type SelectOnChange = (value: SelectItem['value']) => void;

export type AlertColor = 'success' | 'error' | 'warn' | 'info';
