import { useSelector } from 'react-redux';
import { RootState } from './../store/store'; 

export const useTheme = () => useSelector((state: RootState) => state.mainReducer.theme);