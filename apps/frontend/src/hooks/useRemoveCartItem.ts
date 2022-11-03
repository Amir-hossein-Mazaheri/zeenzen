import { useDecrementCartItemMutation } from '@zeenzen/data';

import graphqlClient from '../api/graphql-client';
import { REMOVE_ITEM } from '../store/entities/cart';
import getErrorMessages from '../utils/getErrorMessages';
import { useAppDispatch } from './useAppDispatch';
import useCart, { CartType } from './useCart';
import useToast from './useToast';

interface UseRemoveCartItemOptions {
  type: CartType;
  refetchCart: ReturnType<typeof useCart>['refetchCart'];
  cartId: ReturnType<typeof useCart>['id'];
}

export default function useRemoveCartItem({
  type,
  refetchCart,
  cartId,
}: UseRemoveCartItemOptions) {
  const removeCartItemMutation = useDecrementCartItemMutation(graphqlClient);

  const dispatch = useAppDispatch();

  const toast = useToast();

  return async (courseId: string, title: string) => {
    const successMessage = () =>
      toast().fire({
        title: `${title} با موفقیت از سبد خرید حذف شد.`,
        icon: 'success',
      });

    if (type === CartType.LOCAL) {
      dispatch(REMOVE_ITEM({ courseId }));

      successMessage();

      return;
    }

    try {
      await removeCartItemMutation.mutateAsync({
        decrementCartItem: {
          cartId: cartId || '',
          courseId,
          quantity: 1,
        },
      });

      if (refetchCart) {
        refetchCart();
      }

      successMessage();
    } catch (err) {
      getErrorMessages(err).map((errorMessage) =>
        toast().fire({
          title: errorMessage,
          icon: 'error',
        })
      );
    }
  };
}
