import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);

  return (
    <div>
      <h2>Dashboard</h2>
      {authTokens ? (
        <>
          <p>Welcome! You are logged in.</p>
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Dashboard;
