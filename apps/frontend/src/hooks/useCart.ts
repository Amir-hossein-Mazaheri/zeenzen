import { useCartQuery } from '@zeenzen/data';
import { graphqlClient, Types } from '@zeenzen/common';

import { selectCartItems } from '../store/entities/cart';
import { useAppSelector } from './useAppSelector';
import useUser from './useUser';

export enum CartType {
  LOCAL,
  DB,
}

export default function useCart() {
  const { isAuthenticated, user } = useUser();

  const {
    data,
    isLoading,
    error,
    refetch: refetchCart,
  } = useCartQuery(graphqlClient, {
    cartId: user?.cart.id || '',
  });

  const cartItems = useAppSelector(selectCartItems);

  console.log('cart errors: ', error);

  if (isAuthenticated) {
    return {
      type: CartType.DB,
      id: user?.cart?.id,
      isLoading,
      refetchCart,
      totalPrice: data?.cart.totalPrice || 0,
      totalPriceWithDiscount: data?.cart.totalPriceWithDiscount || 0,
      items: data?.cart.cartItems?.map<Types.CartItem>(
        ({
          unitPriceWithDiscount,
          unitPrice,
          course: {
            id,
            title,
            image: { image },
            instructors,
          },
        }) => ({
          id,
          title,
          thumbnail: image,
          price: unitPrice,
          instructors: instructors.map(
            ({ user: { firstname, lastname } }) => `${firstname} ${lastname}`
          ),
          discountedPrice: unitPriceWithDiscount,
        })
      ),
    };
  }

  return {
    type: CartType.LOCAL,
    items: cartItems,
    totalPrice:
      cartItems.length > 0
        ? cartItems
            .map((cartItem) => cartItem.discountedPrice)
            .reduce((prevVal, currVal) => prevVal + currVal)
        : 0,
  };
}
