export default function sanitizeSlash(url: string) {
  const containTrailingSlash = url.at(-1) === '/';

  if (containTrailingSlash) {
    return url.slice(0, url.length - 2);
  }

  return url;
}
