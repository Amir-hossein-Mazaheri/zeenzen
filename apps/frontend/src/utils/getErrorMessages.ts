export default function getErrorMessages(error: any) {
  const messages: string[] = error?.response?.errors?.map(
    (err: any) => err?.message
  );

  if (messages && messages.length > 0) {
    return messages;
  }

  return [
    "مشکلی پیش آمده است، اتصال خود نسبت به اینترنت رو بررسی کنید و مجدد تلاش کنید.",
  ];
}
