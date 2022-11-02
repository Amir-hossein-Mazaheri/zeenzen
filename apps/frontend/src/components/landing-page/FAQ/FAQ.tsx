import React from "react";

import UnderlinedTitle from "../../../common/UnderlinedTitle";
import AccordionContainer from "./AccordionContainer";

const accordionItems = [1, 2, 3, 4, 5].map((n) => ({
  id: n,
  question: "دوره ها شامل تخفیف هم میشند؟",
  answer: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
          درصد گذشته، حال`,
}));

const FAQ = () => {
  return (
    <div>
      <UnderlinedTitle
        center
        element="h1"
        size="text-6xl"
        title="سوالات متداول"
        className="mt-12"
      />

      <AccordionContainer items={accordionItems} />
    </div>
  );
};

export default FAQ;
