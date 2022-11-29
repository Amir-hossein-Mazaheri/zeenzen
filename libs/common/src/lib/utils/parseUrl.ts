export function parseUrl(url: string) {
  const urlWithoutQuery = url.split('?')[0];

  return urlWithoutQuery.split('/').filter((route) => route.length > 0);
}
