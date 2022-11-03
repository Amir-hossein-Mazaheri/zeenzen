import { SweetAlertIcon } from 'sweetalert2';
import { colors } from '@zeenzen/common';

import { getSwal } from '../utils/getSwal';

interface UseAlertOptions {
  title: string;
  description?: string;
  html?: string;
  icon: SweetAlertIcon;
}

export default function useAlert() {
  return ({ title, icon, description, html }: UseAlertOptions) =>
    getSwal.mixin({
      title,
      icon,
      html,
      text: description,
      showConfirmButton: true,
      confirmButtonText: 'حله',
      confirmButtonColor: colors['light-red'],
    });
}
