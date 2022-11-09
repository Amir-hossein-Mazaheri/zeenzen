import { Types } from '@zeenzen/common';

export default function persistCart(
  items?: Types.CartItem[]
): Types.CartItem[] {
  if (items) {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  return JSON.parse(localStorage.getItem('cart') || '[]');
}
