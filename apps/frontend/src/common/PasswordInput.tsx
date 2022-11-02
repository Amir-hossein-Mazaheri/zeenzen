import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import AppInput, { AppInputProps } from "./AppInput";

interface PasswordInputProps extends AppInputProps {}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AppInput
      {...props}
      type={showPassword ? "text" : "password"}
      renderIcon={() => (
        <div
          onClick={() => setShowPassword((showPassword) => !showPassword)}
          className="absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
        >
          {!showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
        </div>
      )}
    />
  );
};

export default PasswordInput;
