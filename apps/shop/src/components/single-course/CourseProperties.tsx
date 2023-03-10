import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartSimple,
  faClock,
  faListUl,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { Course, useAddCartItemMutation, useCourseQuery } from '@zeenzen/data';
import {
  AppButton,
  ProgressBar,
  Property,
  ShadowBox,
  courseLevelTranslator,
  graphqlClient,
  PriceTag,
} from '@zeenzen/common';

import useIsInCart from '../../hooks/useIsInCart';
import { CartType } from '../../hooks/useCart';
import useToast from '../../hooks/useToast';
import getErrorMessages from '../../utils/getErrorMessages';
import useCartStore from '../../store/useCartStore';

const CourseProperties: React.FC<Course> = ({
  id,
  hoursCount,
  level,
  lecturesCount,
  participantsCount,
  progress,
  price,
}) => {
  const { data } = useCourseQuery(graphqlClient, { courseId: +id });

  const {
    isInCart,
    type,
    id: cartId,
    refetchCart,
    isFetching,
  } = useIsInCart(id);

  const addCartItemMutation = useAddCartItemMutation(graphqlClient);

  const addCartItem = useCartStore((state) => state.addCartItem);

  const toast = useToast();

  const handleAddToCart = async () => {
    const successMessage = () =>
      toast().fire({
        title: 'دوره با موفقیت به سبد خرید اضافه شد.',
        icon: 'success',
        width: 388,
      });

    if (type === CartType.LOCAL) {
      addCartItem({
        id,
        title: data?.course.title || '',
        thumbnail: data?.course.image.image || '',
        price: data?.course.price.toString() || '0',
        instructors:
          data?.course.instructors.map(
            ({ user: { firstname, lastname } }) => `${firstname} ${lastname}`
          ) || [],
        discountedPrice: data?.course.price || 0,
      });

      successMessage();

      return;
    }

    try {
      await addCartItemMutation.mutateAsync({
        addCartItemInput: {
          cartId: cartId || '',
          courseId: id,
          quantity: 1,
        },
      });

      // refetch user that also includes cart and cart items.
      if (refetchCart) {
        refetchCart();
      }

      successMessage();
    } catch (error) {
      getErrorMessages(error).map((errorMessage) =>
        toast().fire({
          title: errorMessage,
          icon: 'error',
        })
      );
    }
  };

  return (
    <ShadowBox title="مشخصات دوره" titleSize="lg">
      <div className="space-y-9 mt-5">
        <Property
          renderIcon={<FontAwesomeIcon icon={faClock} />}
          gap="gap-3"
          text="ساعت"
          property={hoursCount}
        />
        <Property
          renderIcon={<FontAwesomeIcon icon={faChartSimple} />}
          gap="gap-3"
          text={courseLevelTranslator(level)}
        />
        <Property
          renderIcon={<FontAwesomeIcon icon={faListUl} />}
          gap="gap-3"
          text="قسمت"
          property={lecturesCount}
        />
        <Property
          renderIcon={<FontAwesomeIcon icon={faUsers} />}
          gap="gap-3"
          text="شرکت کننده"
          property={participantsCount}
        />
      </div>

      <div className="my-12">
        <p className="flex items-center justify-between font-semibold text-text-black">
          <span>درصد پیشرفت دوره: </span>
          <span>
            <span>{progress}</span>
            <span>%</span>
          </span>
        </p>
        <ProgressBar className="mt-3" progress={progress} />
      </div>

      <PriceTag price={price} />

      <AppButton
        className="w-full font-bold py-3 flex justify-center items-center gap-2"
        disabled={isInCart}
        onClick={handleAddToCart}
        loading={addCartItemMutation.isLoading || isFetching}
      >
        {isInCart ? (
          <>
            <FontAwesomeIcon icon={faCircleCheck} />
            <p className="text-[0.8rem]">به سبد خرید اضافه شده است.</p>
          </>
        ) : (
          <>
            <p>ثبت نام در دوره</p>
          </>
        )}
      </AppButton>
    </ShadowBox>
  );
};

export default CourseProperties;
