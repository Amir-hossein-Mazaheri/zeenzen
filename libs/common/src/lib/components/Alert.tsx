import React, { forwardRef } from 'react';
import MUIAlert, {
  AlertColor,
  AlertProps as MUIAlertProps,
} from '@mui/material/Alert';

export type AlertMessage = { text: string; type: AlertColor };

export type AlertMessageSet = Set<AlertMessage>;

interface AlertProps extends Omit<MUIAlertProps, 'onClose'> {
  messages?: AlertMessageSet;
  onClose?: (message: AlertMessage) => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { messages, onClose, ...rest },
  ref
) {
  if (!messages || messages.size === 0) {
    return <></>;
  }

  return (
    <div ref={ref} className="space-y-4">
      {[...messages].map((message) => (
        <MUIAlert
          onClose={() => onClose && onClose(message)}
          key={message.text}
          severity={message.type}
          {...rest}
        >
          {message.text}
        </MUIAlert>
      ))}
    </div>
  );
});
