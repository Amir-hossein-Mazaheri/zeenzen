import { useRouter } from "next/router";

import { UserRole } from "../generated/queries";
import expandUserRole from "../utils/expandUserRole";
import useToast from "./useToast";
import useUser from "./useUser";

export default function useProtectedRoute(userRole = UserRole.Customer) {
  const user = useUser();

  const router = useRouter();

  const toast = useToast();

  if (
    !user.loading &&
    !user.isAuthenticated &&
    !expandUserRole(userRole).some((role) => role === user.role)
  ) {
    toast({}).fire({
      title: "شما اجازه دسترسی به این بخش رو ندارید.",
      icon: "error",
    });

    router.replace("/signin");
  }

  return user;
}
