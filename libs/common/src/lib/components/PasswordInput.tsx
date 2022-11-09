import React, { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AppInput, { AppInputProps } from './AppInput';

const iconClassName = 'w-5 h-5';

export const PasswordInput: React.FC<AppInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AppInput
      {...props}
      type={showPassword ? 'text' : 'password'}
      renderIcon={() => (
        <div
          onClick={() => setShowPassword((showPassword) => !showPassword)}
          className="absolute mt-[0.2rem] left-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
        >
          {showPassword ? (
            <FontAwesomeIcon icon={faEye} className={iconClassName} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} className={iconClassName} />
          )}
        </div>
      )}
    />
  );
};

export default PasswordInput;
