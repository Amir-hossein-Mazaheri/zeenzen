import { UserRole } from "../generated/queries";

export default function expandUserRole(userRole: UserRole) {
  if (userRole === UserRole.Instructor) {
    return [UserRole.Instructor, UserRole.Customer];
  } else if (userRole === UserRole.Admin) {
    return [UserRole.Admin, UserRole.Instructor, UserRole.Customer];
  }

  return [UserRole.Customer];
}
