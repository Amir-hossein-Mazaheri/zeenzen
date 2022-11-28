import { createContext } from 'react';

type TBreadcrumbContext = {
  translator: {
    [k: string]: string;
  };
};

export const BreadcrumbContext = createContext<TBreadcrumbContext>({
  translator: {},
});
