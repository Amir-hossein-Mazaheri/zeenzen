import { useRouter } from 'next/router';
import { SweetAlertIcon } from 'sweetalert2';

import useToast from './useToast';

interface UserRedirectOptions {
  to: string;
  shallow?: boolean;
  replace?: boolean;
  message?: string;
  toastType?: SweetAlertIcon;
}

/**
 *
 * @param Object options - if you don't want to use message options its better to directly use next router
 *
 */
export default function useRedirect({
  to,
  replace = false,
  shallow = false,
  message,
  toastType,
}: UserRedirectOptions) {
  const router = useRouter();

  const toast = useToast();

  return function redirect() {
    if (replace) {
      router.replace(to, {}, { shallow });
    } else {
      router.push(to, {}, { shallow });
    }

    if (message) {
      toast().fire({
        title: message,
        icon: toastType,
      });
    }
  };
}
