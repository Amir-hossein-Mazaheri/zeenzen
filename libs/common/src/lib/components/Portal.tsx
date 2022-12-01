import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  as?: string;
}

const parent = document.body;

const Portal: React.FC<PortalProps> = ({
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
    parent.appendChild(portalContainer);

    return () => {
      parent.removeChild(portalContainer);
    };
  }, [portalContainer]);

  return createPortal(children, portalContainer);
};

export default Portal;
