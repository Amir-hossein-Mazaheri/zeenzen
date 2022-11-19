import { SweetAlertPosition } from 'sweetalert2';

import { getSwal } from '../utils/getSwal';

interface UseToastOptions {
  position?: SweetAlertPosition;
  timer?: number;
  timerProgressBar?: boolean;
}

export default function useToast() {
  return ({ position, timer, timerProgressBar }: UseToastOptions = {}) =>
    getSwal.mixin({
      toast: true,
      position: position || 'top-end',
      showConfirmButton: false,
      timer: timer || 3000,
      timerProgressBar: timerProgressBar || true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', getSwal.stopTimer);
        toast.addEventListener('mouseleave', getSwal.resumeTimer);
      },
    });
}
