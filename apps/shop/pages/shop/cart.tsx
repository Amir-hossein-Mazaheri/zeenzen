import Head from 'next/head';
import Image from 'next/image';
import React, { FormEventHandler, useMemo, useState } from 'react';
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
import PaymentMethods, {
  PaymentMethod,
} from '../../src/components/shop/PaymentMethods';
import CartPriceStatus from '../../src/components/shop/CartPriceStatus';

const paymentMethods = [
  {
    text: 'درگاه پرداخت زرین پال',
    value: 'zarinpal',
  },
  {
    text: 'درگاه پرداخت ای دی پی',
    value: 'idpay',
  },
];

const PAYMENT_METHOD_KEY = 'paymentMethod';

const getLocalPaymentMethod = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return localStorage.getItem(PAYMENT_METHOD_KEY);
};

const CartPage: NextPageWithLayout = () => {
  const [paymentMethod, setPaymentMethod] = useState(
    getLocalPaymentMethod() || paymentMethods[0].value
  );

  const handleSetPaymentMethod = (value: PaymentMethod['value']) => {
    setPaymentMethod(value);
    localStorage.setItem(PAYMENT_METHOD_KEY, value);
  };

  const {
    type,
    items,
    totalPrice,
    totalPriceWithDiscount,
    isLoading,
    isFetching,
    refetchCart,
    id: cartId,
    error,
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
    console.log(paymentMethod);
  };

  return (
    <>
      <Head>
        <title>{addToTitle('سبد خرید')}</title>
      </Head>

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
                <Loadable isLoading={!!(isLoading || isFetching)} error={error}>
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
                <Loadable isLoading={!!(isLoading || isFetching)} error={error}>
                  <form onSubmit={handlePayment}>
                    <PaymentMethods
                      className="mb-5 mt-2"
                      defaultValue={paymentMethod}
                      onChange={handleSetPaymentMethod}
                      paymentMethods={paymentMethods}
                    />

                    <CartPriceStatus
                      totalPrice={totalPrice.toString()}
                      totalPriceWithDiscount={
                        totalPriceWithDiscount?.toString() ||
                        totalPrice.toString()
                      }
                      className="mb-8"
                    />

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
                        !hasDiscount
                          ? 'مجموع پرداختی'
                          : 'مجموع پرداختی با تخفیف'
                      }
                      fontSize="text-xl"
                    />

                    <AppButton className="w-full" type="submit">
                      <p>پرداخت</p>
                    </AppButton>
                  </form>
                </Loadable>
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
