import {
    Navigate,
  } from 'react-router-dom';
  
  const ProtectedRoute = ({ children }) => {
    // const { token } = useAuth();
    const token = sessionStorage.getItem('token');
  
    if (!token) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };

  export default ProtectedRoute;