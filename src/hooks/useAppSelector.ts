import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { TRootState } from 'store/store';

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
