export default function getFormErrorMessages() {
  return {
    required: 'پر کردن این فیلد الزامی است',
    email: 'ایمیل نا معتبر است',
    min: (name: string, length: number) =>
      `حداقل طول ${name} ${length} حرف است`,
    incorrectRepeatPassword: 'رمز عبور ها تطابق ندارند',
  };
}
