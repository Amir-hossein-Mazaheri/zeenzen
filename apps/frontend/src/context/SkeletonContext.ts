import { createContext } from "react";

import { SkeletonAnimation } from "../types";

const SkeletonContext = createContext<{ animation: SkeletonAnimation }>({
  animation: false,
});

export default SkeletonContext;
