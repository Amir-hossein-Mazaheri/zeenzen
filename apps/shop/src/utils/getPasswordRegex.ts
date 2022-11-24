import { errorUtil } from 'zod/lib/helpers/errorUtil';

export default function getPasswordRegex(
  optional = false
): [RegExp, errorUtil.ErrMessage] {
  return [
    /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
    {
      message: 'پسورد حداقل باید دارای 8 کاراکتر، یه حرف و یه عدد باشه',
    },
  ];
}
