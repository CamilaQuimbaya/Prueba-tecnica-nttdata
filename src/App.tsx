import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './notes/pages/Dashboard';
import Register from './auth/pages/Register';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Ruta fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
