import { useSelector } from 'react-redux';
import { RootState } from './../store/store'; // Adjust the path according to your project

export const useTheme = () => useSelector((state: RootState) => state.mainReducer.theme);