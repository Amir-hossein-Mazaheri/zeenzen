import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootState } from "../store/configStore";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
