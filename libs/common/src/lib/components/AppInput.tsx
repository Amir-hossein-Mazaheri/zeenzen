import React, { InputHTMLAttributes, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

export interface AppInputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  name: string;
  label?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  rounded?: boolean;
  textArea?: boolean;
  renderIcon?: () => JSX.Element;
}

export const AppInput: React.FC<AppInputProps> = ({
  name,
  label,
  id,
  placeholder,
  value,
  className,
  rounded,
  renderIcon,
  textArea,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputProps = useMemo(
    () => ({
      ...rest,
      className: `outline-none w-full px-6 py-3 border border-gray-200 ${
        rounded ? 'rounded-full' : 'rounded-xl'
      } placeholder-gray-400 placeholder:font-bold w-full ${className}`,
      id,
      placeholder,
      value,
      ...register(name),
    }),
    [rest, className, id, name, placeholder, register, rounded, value]
  );

  return (
    <div>
      {label && (
        <label
          className="text-text-black font-bold mb-2 mr-1 block"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {!textArea ? (
          <input {...inputProps} />
        ) : (
          <textarea {...inputProps}></textarea>
        )}
        {renderIcon && renderIcon()}
      </div>

      {errors[name] && (
        <div
          data-testid="form-error-message"
          className="text-red-500 mr-3 mt-3 text-sm font-semibold"
        >
          <span>{errors[name]?.message?.toString()}</span>
        </div>
      )}
    </div>
  );
};

export default AppInput;
