import { ReactNode } from 'react';

export type CartItem = {
  id: string;
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

export type SelectOnChange = (value: SelectItem['value']) => void;

export type AlertColor = 'success' | 'error' | 'warn' | 'info';
