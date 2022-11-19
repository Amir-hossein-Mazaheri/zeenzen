import React from 'react';
import { RadioGroup } from '@headlessui/react';

export interface PaymentMethod {
  text: string;
  value: string;
}

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  className?: string;
  defaultValue?: PaymentMethod['value'];
  onChange?: (value: PaymentMethod['value']) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  paymentMethods,
  className,
  defaultValue,
  onChange,
}) => {
  return (
    <RadioGroup
      className={`${className}`}
      value={defaultValue}
      onChange={onChange}
      name="payment-method"
    >
      <RadioGroup.Label className="font-semibold text-xl">
        نحوه پرداخت
      </RadioGroup.Label>

      <ul className="space-y-5 pr-5 pl-4 py-4 font-medium">
        {paymentMethods.map(({ text, value }) => (
          <RadioGroup.Option key={value} value={value}>
            {({ checked }) => (
              <li
                className={`${
                  checked ? 'before:bg-light-red' : ''
                } before:rounded-full before:border-4 before:border-light-red before:w-5 before:h-5 before:max-w-5 before:max-h-5 before:transition-all before:duration-100 flex gap-1 items-center`}
              >
                <span>{text}</span>
              </li>
            )}
          </RadioGroup.Option>
        ))}
      </ul>
    </RadioGroup>
  );
};

export default PaymentMethods;
