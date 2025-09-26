import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    console.log("my user", user);
  }, [user]);

  if (!user) {
    return <h1 className="text-center mt-10 text-xl">Hello unknown user</h1>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* User Info Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Hello, {user.username}
          </h1>
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* User Basic Info */}
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">First Name:</span>{" "}
            {user.customer_profile?.first_name}
          </p>
          <p>
            <span className="font-medium">Last Name:</span>{" "}
            {user.customer_profile?.last_name}
          </p>
          <p>
            <span className="font-medium">Contact:</span>{" "}
            {user.customer_profile?.contact}
          </p>
        </div>
      </div>

      {/* Addresses */}
      <div className="mt-8 bg-white shadow-md rounded-2xl p-6 border">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Addresses</h2>
        {user.addresses?.length > 0 ? (
          <ul className="space-y-4">
            {user.addresses.map((address) => (
              <li
                key={address.id}
                className="border rounded-lg p-4 bg-gray-50 hover:shadow-sm"
              >
                <p className="font-medium">{address.full_name}</p>
                <p className="text-sm text-gray-600">
                  📞 {address.phone_number}
                </p>
                <p className="text-sm text-gray-600">
                  {address.street_address}, {address.city},{" "}
                  {address.state} - {address.postal_code}
                </p>
                <p className="text-sm text-gray-600">{address.country}</p>
                {editing && (
                  <button className="mt-2 px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                    Edit Address
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No addresses added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
