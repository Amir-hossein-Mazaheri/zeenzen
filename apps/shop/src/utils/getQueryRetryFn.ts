export default function getQueryRetryFn(retries = 3) {
  return (failureCount: number, error: any) => {
    const statusCode =
      error?.response?.errors?.[0]?.extensions?.response?.statusCode;
    if (statusCode === 403 || statusCode === 401) {
      return false;
    }

    return failureCount < retries;
  };
}
