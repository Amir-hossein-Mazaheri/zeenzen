import { MatchOptions } from "yup/lib/string";

export default function getPasswordRegex(
  optional = false
): [RegExp, MatchOptions] {
  return [
    /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
    {
      message: "پسورد حداقل باید دارای 8 کاراکتر، یه حرف و یه عدد باشه",
      excludeEmptyString: optional,
    },
  ];
}
