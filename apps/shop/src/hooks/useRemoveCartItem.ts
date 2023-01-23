import { useDecrementCartItemMutation } from '@zeenzen/data';
import { graphqlClient } from '@zeenzen/common';

import getErrorMessages from '../utils/getErrorMessages';
import useCart, { CartType } from './useCart';
import useToast from './useToast';
import useCartStore from '../store/useCartStore';

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

  const removeCartItem = useCartStore((state) => state.removeCartItem);

  const toast = useToast();

  return async (courseId: number, title: string) => {
    const successMessage = () =>
      toast().fire({
        title: `${title} با موفقیت از سبد خرید حذف شد.`,
        icon: 'success',
      });

    if (type === CartType.LOCAL) {
      removeCartItem(courseId);

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
