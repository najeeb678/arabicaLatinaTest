import { AppDispatch, RootState } from "@/redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Custom hooks for Redux
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
