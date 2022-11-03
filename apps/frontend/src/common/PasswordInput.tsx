import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import AppInput, { AppInputProps } from './AppInput';

const PasswordInput: React.FC<AppInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AppInput
      {...props}
      type={showPassword ? 'text' : 'password'}
      renderIcon={() => (
        <div
          onClick={() => setShowPassword((showPassword) => !showPassword)}
          className="absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
        >
          {showPassword ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </div>
      )}
    />
  );
};

export default PasswordInput;
