import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { userDetails, user } = useContext(AuthContext);
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      {user && user.addresses.length > 0 ? (
  <div>
    <h1>Hello {user.username} from profile page</h1>
    <h2>Addresses:</h2>
    <ul>
      {user.addresses.map((address) => (
        <li key={address.id}>
          {address.full_name} — {address.phone_number}
        </li>
      ))}
    </ul>
  </div>
) : (
  <h1>Hello unknown user</h1>
)}
    </div>
  );
};

export default Profile;
