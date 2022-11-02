import React from 'react';
import { ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import {
  ChartBarIcon,
  QueueListIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';

import AppButton from '../../common/AppButton';
import ProgressBar from '../../common/ProgressBar';
import Property from '../../common/Property';
import ShadowBox from '../../common/ShadowBox';
import {
  Course,
  useAddCartItemMutation,
  useCourseQuery,
} from '../../generated/queries';
import courseLevelTranslator from '../../utils/courseLevelTranslator';
import useIsInCart from '../../hooks/useIsInCart';
import { CartType } from '../../hooks/useCart';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ADD_ITEM } from '../../store/entities/cart';
import graphqlClient from '../../api/graphql-client';
import useToast from '../../hooks/useToast';
import getErrorMessages from '../../utils/getErrorMessages';
import PriceTag from '../../common/PriceTag';

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

  const { isInCart, type, id: cartId, refetchCart } = useIsInCart(id);

  const addCartItemMutation = useAddCartItemMutation(graphqlClient);

  const dispatch = useAppDispatch();

  const toast = useToast();

  const handleAddToCart = async () => {
    const successMessage = () =>
      toast().fire({
        title: 'دوره با موفقیت به سبد خرید اضافه شد.',
        icon: 'success',
        width: 388,
      });

    if (type === CartType.LOCAL) {
      dispatch(
        ADD_ITEM({
          item: {
            id,
            title: data?.course.title || '',
            thumbnail: data?.course.image.image || '',
            price: data?.course.price || 0,
            instructors:
              data?.course.instructors.map(
                ({ user: { firstname, lastname } }) =>
                  `${firstname} ${lastname}`
              ) || [],
            discountedPrice: data?.course.price || 0,
          },
        })
      );

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
        toast({}).fire({
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
          renderIcon={<ClockIcon className="w-6 h-6" />}
          gap="gap-3"
          text="ساعت"
          property={hoursCount}
        />
        <Property
          renderIcon={<ChartBarIcon className="w-6 h-6" />}
          gap="gap-3"
          text={courseLevelTranslator(level)}
        />
        <Property
          renderIcon={<QueueListIcon className="w-6 h-6" />}
          gap="gap-3"
          text="قسمت"
          property={lecturesCount}
        />
        <Property
          renderIcon={<UserGroupIcon className="w-6 h-6" />}
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
        loading={addCartItemMutation.isLoading}
      >
        {isInCart ? (
          <>
            <CheckCircleIcon width={30} height={30} />
            <p className="text-sm">به سبد خرید اضافه شده است.</p>
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
