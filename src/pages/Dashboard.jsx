import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";


const Dashboard = () => {
  const { userDetails, authTokens, logoutUser , user } = useContext(AuthContext);

  return (
    <div>
      <h2>Dashboard</h2>
      {authTokens ? (
        <>
          <p>Welcome! You are logged in.</p>
          {user && <p>Hello, {user.username}</p>}
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Dashboard;
