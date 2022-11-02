import { Request } from 'express';

export function getUrl(req: Request): string {
  return `${req.protocol}://${req.get('host')}`;
}
