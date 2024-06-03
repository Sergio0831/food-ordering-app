import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAthContext must be used within a AuthContextProvider');

  return context;
};
