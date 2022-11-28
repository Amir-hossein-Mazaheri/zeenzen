import { useContext, useMemo } from 'react';

import { Crumb } from '../types';
import { BreadcrumbContext } from '../context';

function getNestedRoutes(absolutePath: string) {
  const routeWithoutQuery = absolutePath.split('?')[0];

  return routeWithoutQuery.split('/').filter((route) => route.length > 0);
}

export function useBreadcrumbs(
  absolutePath: string,
  pathname: string,
  keyResolvers: Map<string, string>
) {
  const { translator } = useContext(BreadcrumbContext);

  return useMemo<Crumb[]>(() => {
    const nestedAbsolutePaths = getNestedRoutes(absolutePath);
    const nestedPathnames = getNestedRoutes(pathname);

    const crumbsList = nestedAbsolutePaths.map<Crumb>((route, index) => {
      const nestedPathname = nestedPathnames[index];

      return {
        text:
          nestedPathname.at(0) === '[' && nestedPathname.at(-1) === ']'
            ? keyResolvers.get(
                nestedPathname.replace('[', '').replace(']', '')
              ) ??
              translator[route] ??
              route
            : route,
        href: '/' + nestedAbsolutePaths.slice(0, index + 1).join('/'),
      };
    });

    return [{ href: '/', text: 'خانه' }, ...crumbsList];
  }, [absolutePath, keyResolvers, pathname]);
}
