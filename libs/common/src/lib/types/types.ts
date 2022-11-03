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

export type AlertColor = 'success' | 'error' | 'warn' | 'info';
