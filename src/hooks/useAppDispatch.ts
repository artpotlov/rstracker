import { useDispatch } from 'react-redux';
import { TAppDispatch } from 'store/store';

export const useAppDispatch: () => TAppDispatch = useDispatch;
