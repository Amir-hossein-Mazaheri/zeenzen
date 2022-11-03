import Head from 'next/head';
import Image from 'next/image';
import React, { FormEventHandler, useMemo } from 'react';
import {
  AppButton,
  CartItem,
  Conditional,
  FalseCondition,
  Loadable,
  PriceTag,
  ShadowBox,
  TrueCondition,
} from '@zeenzen/common';

import emptyCartIllustration from '../../src/assets/images/cart/empty-cart.svg';
import useCart from '../../src/hooks/useCart';
import useRemoveCartItem from '../../src/hooks/useRemoveCartItem';
import ShopLayout from '../../src/layouts/ShopLayout';
import addToTitle from '../../src/utils/addToTitle';
import { NextPageWithLayout } from '../_app';

const CartPage: NextPageWithLayout = () => {
  const {
    type,
    items,
    totalPrice,
    totalPriceWithDiscount,
    isLoading,
    refetchCart,
    id: cartId,
  } = useCart();

  const removeCartItem = useRemoveCartItem({
    cartId,
    refetchCart,
    type,
  });

  const hasDiscount = useMemo(
    () => totalPriceWithDiscount && totalPrice !== totalPriceWithDiscount,
    [totalPrice, totalPriceWithDiscount]
  );

  const handlePayment: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    console.log(event);
  };

  return (
    <>
      <Head>{addToTitle('سبد خرید')}</Head>

      <Conditional condition={(items?.length || 0) > 0}>
        <FalseCondition>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Image src={emptyCartIllustration} alt="سبد خرید خالی" />
            <h1 className="font-extrabold text-3xl text-title-black">
              سبد خرید شما خالی است.
            </h1>
          </div>
        </FalseCondition>
        <TrueCondition>
          <div>
            <h1 className="font-extrabold text-4xl mb-12">سبد خرید</h1>

            <div className="flex justify-between items-start gap-7">
              <ShadowBox
                title="جزییات سبد خرید"
                titleSize="lg"
                className="px-7 py-12 basis-2/3"
              >
                <Loadable isLoading={isLoading || false}>
                  <div className="space-y-10">
                    {items?.map((item) => (
                      <CartItem
                        key={item.id}
                        {...item}
                        onDelete={removeCartItem}
                        priceWithDiscount={item.discountedPrice}
                      />
                    ))}
                  </div>
                </Loadable>
              </ShadowBox>

              <ShadowBox
                title="جزییات پرداخت"
                titleSize="lg"
                className="basis-1/4 sticky top-12"
              >
                <form onSubmit={handlePayment}>
                  {hasDiscount && (
                    <PriceTag
                      crossed
                      price={totalPrice}
                      prefix="مجموع پرداختی"
                      fontSize="text-xl"
                      color="text-light-red"
                      crossedColor="before:bg-light-red"
                    />
                  )}

                  <PriceTag
                    price={
                      !(totalPriceWithDiscount && hasDiscount)
                        ? totalPrice
                        : totalPriceWithDiscount
                    }
                    prefix={
                      !hasDiscount ? 'مجموع پرداختی' : 'مجموع پرداختی با تخفیف'
                    }
                    fontSize="text-xl"
                  />

                  <AppButton className="w-full" type="submit">
                    <p>پرداخت</p>
                  </AppButton>
                </form>
              </ShadowBox>
            </div>
          </div>
        </TrueCondition>
      </Conditional>
    </>
  );
};

CartPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default CartPage;
