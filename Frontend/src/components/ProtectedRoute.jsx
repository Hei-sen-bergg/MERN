

import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserProfile } from '../services/authService'; 

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const profile = await getUserProfile();  // This checks if the user is authenticated
      setIsAuthenticated(profile.success);  // Update state with the auth status
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;  // Show a loading state while the auth check is in progress
  }

  if (isAuthenticated) {
    return children;  // If authenticated, render children (ProfilePage)
  } else {
    return <Navigate to="/login" />;  // If not authenticated, redirect to login
  }
};

export default PrivateRoute;






