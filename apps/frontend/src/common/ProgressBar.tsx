import { Box } from "@mui/system";
import React from "react";

interface ProgressBarProps {
  progress: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className }) => {
  return (
    <Box
      sx={{
        ":before": {
          width: `${progress}%`,
        },
      }}
      className={`rounded-full h-5 w-full bg-white shadow shadow-gray-200/85 relative overflow-hidden before:bg-light-red before:content-[""] before:absolute before:top-0 before:bottom-0 before:left-0 ${className}`}
    />
  );
};

export default ProgressBar;
