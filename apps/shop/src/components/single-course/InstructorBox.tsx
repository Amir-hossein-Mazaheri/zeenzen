import React from 'react';
import { Instructor as InstructorBoxProps } from '@zeenzen/data';
import { ShadowBox, Avatar, AppLink } from '@zeenzen/common';
import { LINKS } from '../../constants/links';

const InstructorBox: React.FC<InstructorBoxProps> = ({
  id,
  user,
  expertises,
}) => {
  return (
    <ShadowBox
      title="مدرس دوره"
      titleSize="lg"
      className="flex items-center justify-between pt-10"
    >
      <div className="">
        <h3 className="font-black text-xl text-title-black">
          {`${user.firstname} ${user.lastname}`}
        </h3>

        {expertises && (
          <p className="font-light text-sm mt-3">
            <span>متخصص حوزه</span>{' '}
            {
              expertises?.find((expertise) => expertise.isPrimary === true)
                ?.label
            }
          </p>
        )}

        <AppLink
          className="mt-6"
          href={LINKS.INSTRUCTORS.SINGLE_INSTRUCTOR(id)}
          text="مشاهده درباره من"
          size="sm"
        />
      </div>

      <Avatar image={user.avatar?.fullPath} width={100} height={100} />
    </ShadowBox>
  );
};

export default InstructorBox;
