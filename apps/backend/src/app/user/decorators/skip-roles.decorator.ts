import { SetMetadata } from '@nestjs/common';

export const CAN_SKIP_ROLES_KEY = 'skip-roles';

export const SkipRoles = () => SetMetadata(CAN_SKIP_ROLES_KEY, true);
