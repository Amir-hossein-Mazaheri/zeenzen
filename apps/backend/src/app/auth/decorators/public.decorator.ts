import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'public';

export const Public = () => SetMetadata(IS_PUBLIC, true);
