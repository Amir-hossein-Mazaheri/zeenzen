import React, { forwardRef } from 'react';

import { AlertColor } from '../types';
import Alert, { AlertProps } from './Alert';

export type AlertMessage = { text: string; type: AlertColor };

export type AlertMessageSet = Set<AlertMessage>;

interface AlertsProps extends Omit<AlertProps, 'onClose' | 'children'> {
  messages?: AlertMessageSet;
  onClose?: (message: AlertMessage) => void;
}

export const Alerts = forwardRef<HTMLDivElement, AlertsProps>(function Alerts(
  { messages, onClose, ...rest },
  ref
) {
  if (!messages || messages.size === 0) {
    return <></>;
  }

  return (
    <div ref={ref} className="space-y-4">
      {[...messages].map((message) => (
        <Alert
          onClose={() => onClose && onClose(message)}
          key={message.text}
          {...rest}
          color={message.type}
        >
          {message.text}
        </Alert>
      ))}
    </div>
  );
});

export default Alerts;
