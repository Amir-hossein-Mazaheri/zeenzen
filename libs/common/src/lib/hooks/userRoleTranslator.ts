import { UserRole } from '@zeenzen/data';

export function userRoleTranslator(userRole: UserRole) {
  switch (userRole) {
    case UserRole.Admin:
      return 'مدیر';
    case UserRole.Instructor:
      return 'مدرس';
    case UserRole.Customer:
      return 'کاربر';
  }
}
