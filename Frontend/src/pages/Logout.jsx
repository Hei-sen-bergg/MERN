import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const profile = await logoutUser(); 
      if (profile.success) {
        return navigate("/login");
      } else {
       console.log("Logout failed");
      }
    };
    logout();
  }, [navigate]);

  return (
    <div>
      <h1>Logging Out...</h1>
      <p>You are being redirected to the login page.</p>
    </div>
  );
};

export default LogoutPage;

