import React from 'react';
import { AppButton } from '@zeenzen/common';

const Newsletter = () => {
  return (
    <div className="absolute top-0 left-1/2 bg-white -translate-x-1/2 -translate-y-[80%] text-center max-w-2xl w-[95%] rounded-xl shadow-2xl shadow-gray-600/80 px-8 py-9">
      <h3 className="text-3xl font-extrabold">در خبرنامه ما مشترک شوید</h3>
      <p className="font-xl mt-2">
        با مشترک شدن در خبرنامه ما از جدیدترین تخفیفات و دوره ها مطلع می شوید
      </p>

      <form>
        <div className="w-full bg-white rounded-full overflow-hidden flex items-center mt-8 shadow-mild-shadow shadow-gray-300/80">
          <input
            className="grow outline-none px-6 py-3"
            placeholder="ایمیل خود را وارد کنید..."
            name="newsletter-email"
            id="newsletter-email"
          />
          <div className="scale-90">
            <AppButton rounded>مشترک شدن</AppButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Newsletter;
