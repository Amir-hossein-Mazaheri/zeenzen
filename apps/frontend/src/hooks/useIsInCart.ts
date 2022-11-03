import useCart from './useCart';

export default function useIsInCart(courseId: string) {
  const { items, ...rest } = useCart();

  return {
    ...rest,
    isInCart: !!items?.find((item) => item.id === courseId),
  };
}
