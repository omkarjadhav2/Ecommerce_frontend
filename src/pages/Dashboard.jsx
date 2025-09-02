import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";


const Dashboard = () => {
  const { userDetails, authTokens, logoutUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (authTokens) {
      userDetails(authTokens.access)
        .then((data) => {
          console.log("User profile from API:", data);
          setProfile(data);
        })
        .catch(() => logoutUser());
        
    }
   
    
  }, [authTokens]);

  return (
    <div>
      <h2>Dashboard</h2>
      {authTokens ? (
        <>
          <p>Welcome! You are logged in.</p>
          {profile && <p>Hello, {profile.username}</p>}
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Dashboard;
