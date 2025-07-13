import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const token = useAppSelector(state => state.auth.token);
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
