import { useCartQuery } from '@zeenzen/data';
import { graphqlClient, Types } from '@zeenzen/common';

import useUser from './useUser';
import useCartStore from '../store/useCartStore';
import getQueryRetryFn from '../utils/getQueryRetryFn';

export enum CartType {
  LOCAL,
  DB,
}

export default function useCart() {
  const { isAuthenticated, user } = useUser();

  const {
    data,
    isLoading,
    isFetching,
    refetch: refetchCart,
    error,
  } = useCartQuery(
    graphqlClient,
    {
      cartId: user?.cart.id || '',
    },
    {
      enabled: isAuthenticated,
      retry: getQueryRetryFn(),
    }
  );

  console.log('cart server data: ', data);

  const cartItems = useCartStore((state) => state.items);

  if (isAuthenticated) {
    return {
      type: CartType.DB,
      id: user?.cart?.id,
      isLoading,
      isFetching,
      refetchCart,
      totalPrice: data?.cart.totalPrice ?? 0,
      totalPriceWithDiscount: data?.cart.totalPriceWithDiscount ?? 0,
      error,
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
