import { useRouter } from 'next/router';

import useToast from './useToast';
import useUser from './useUser';

export default function useSkipForUsers() {
  const { loading, isAuthenticated } = useUser();

  const router = useRouter();

  const toast = useToast();

  if (!loading && isAuthenticated) {
    console.log(router);

    toast({}).fire({
      title: 'شما قبلا وارد شده اید.',
      icon: 'info',
    });

    // router.replace("/");
    router.back();
  }
}
