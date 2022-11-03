import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
            <FontAwesomeIcon icon={solid('eye')} />
          ) : (
            <FontAwesomeIcon icon={solid('eye-slash')} />
          )}
        </div>
      )}
    />
  );
};

export default PasswordInput;
