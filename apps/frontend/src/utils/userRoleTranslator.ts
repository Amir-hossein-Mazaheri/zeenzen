import { UserRole } from '@zeenzen/data';

export default function userRoleTranslator(userRole: UserRole) {
  switch (userRole) {
    case UserRole.Admin:
      return 'مدیر';
    case UserRole.Instructor:
      return 'مدرس';
    case UserRole.Customer:
      return 'کاربر';
  }
}
