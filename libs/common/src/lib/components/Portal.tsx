import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  as?: string;
}

//! Note: this component should not be ssr
// ! and should not be used for important content
export const Portal: React.FC<PortalProps> = ({
  id,
  className,
  children,
  as = 'div',
}) => {
  const portalContainer = useMemo(() => {
    const container = document.createElement(as);

    container.id = id;

    if (className) {
      container.classList.add(className);
    }

    return container;
  }, [as, className, id]);

  useEffect(() => {
    const parent = document.body;

    parent.appendChild(portalContainer);

    return () => {
      parent.removeChild(portalContainer);
    };
  }, [portalContainer]);

  return createPortal(children, portalContainer);
};

export default Portal;
