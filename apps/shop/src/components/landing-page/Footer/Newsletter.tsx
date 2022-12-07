import React from 'react';
import { AppButton } from '@zeenzen/common';

const Newsletter = () => {
  return (
    <div className="absolute top-0 left-1/2 bg-white -translate-x-1/2 -translate-y-[80%] text-center max-w-2xl w-[95%] rounded-xl shadow-2xl shadow-gray-600/80 md:px-8 md:py-9 px-6 py-7">
      <h3 className="md:text-3xl text-2xl font-extrabold">
        در خبرنامه ما مشترک شوید
      </h3>
      <p className="text-[0.7rem] md:text-base mt-3">
        با مشترک شدن در خبرنامه ما از جدیدترین تخفیفات و دوره ها مطلع می شوید
      </p>

      <form>
        <div className="w-full bg-white rounded-full overflow-hidden flex items-center md:mt-8 mt-6 shadow-mild-shadow shadow-gray-300/80">
          <input
            className="grow outline-none px-6 md:py-3 py-2 text-sm md:text-base"
            placeholder="ایمیل خود را وارد کنید..."
            name="newsletter-email"
            id="newsletter-email"
          />
          <div className="scale-90">
            <AppButton rounded>
              <span className="text-[0.7rem]">مشترک شدن</span>
            </AppButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Newsletter;
