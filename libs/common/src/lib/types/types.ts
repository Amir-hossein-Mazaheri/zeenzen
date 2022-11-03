export type CartItem = {
  id: string;
  title: string;
  thumbnail: string;
  instructors: string[];
  price: string;
  discountedPrice: number;
};

export type AlertColor = 'success' | 'error' | 'warn' | 'info';
