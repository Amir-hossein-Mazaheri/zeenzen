export function isProd() {
  return process.env['NODE_ENV']?.toLowerCase() === 'production';
}
