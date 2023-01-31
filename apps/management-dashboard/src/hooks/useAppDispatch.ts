import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/configStore';

export const useAppDispatch: () => AppDispatch = useDispatch;
