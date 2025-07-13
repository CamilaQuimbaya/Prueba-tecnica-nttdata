import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './auth/pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './notes/pages/Dashboard';
import Register from './auth/pages/Register';
import PageWrapper from './components/PageWrapper';
import './index.css';

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PageWrapper><Dashboard /></PageWrapper>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
