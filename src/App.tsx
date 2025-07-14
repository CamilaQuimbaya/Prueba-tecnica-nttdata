import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './auth/pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './notes/pages/Dashboard';
import Register from './auth/pages/Register';
import PageWrapper from './components/PageWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './styles/globalScrollbar.css';


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
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </AnimatePresence>
    
  );
};

export default App;
