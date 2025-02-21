import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { getUserProfile } from "../services/authService"; 
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile(); 
      if (profile.success) {
        console.log(profile.data);
        setUser(profile.data); // Set the user data if successful
        setLoading(false); // Stop loading
      } else {
        setLoading(false); // Stop loading, even in case of failure
        navigate("/login"); // Redirect to login if authentication fails
      }
    };
    fetchProfile();
  }, [navigate]); // Add navigate to the dependency array

  if (loading) {
    return <p>Loading...</p>; // You can show a loading state while waiting for the profile
  }

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>User not found</p> 
      )}
    </div>
  );
};

export default ProfilePage;

