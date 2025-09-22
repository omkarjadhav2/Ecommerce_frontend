import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { AuthContext } from "../context/AuthContext";

const SelectAddress = () => {
  const { user, selectedAddress, setSelectedAddress } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showFields, setShowFields] = useState(false);

  useEffect(() => {
    if (!selectedAddress) {
      const stored = localStorage.getItem("selectedAddress");
      if (stored) setSelectedAddress(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    // persist selection so it survives a page refresh
    if (selectedAddress) {
      localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
    }
  }, [selectedAddress]);

  const handleAddressButton = () => {
    setShowFields(!showFields);
  };
  const handleProceed = () => {
    if (!selectedAddress) return;
    // navigate to payment page (change route if needed)
    navigate("/payment");
  };
  const handleFormSubmission =(e)=>{
    
    e.preventDefault();
    // collect form data here and send to backend
    console.log("Form submitted");
  
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* RIGHT: Select Address + Proceed */}
      <div className="mt-8 min-w-80 w-full sm:w-[420px]">
        <div className="w-full">
          <div className="text-2xl">
            <Title text1={"Select"} text2={"Address"} />
          </div>

          {user && user.addresses && user.addresses.length > 0 ? (
            <div>
              <h2 className="mt-2 text-lg">Saved Addresses:</h2>
              <ul className="flex flex-col gap-2 mt-2 text-sm">
                {user.addresses.map((address) => (
                  <li
                    key={address.id}
                    className={`flex justify-between items-center border-2 rounded p-3 cursor-pointer ${
                      selectedAddress?.id === address.id
                        ? "border-black bg-gray-50"
                        : ""
                    }`}
                    onClick={() => setSelectedAddress(address)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <input
                        type="radio"
                        name="selectedAddress"
                        checked={selectedAddress?.id === address.id}
                        readOnly
                        className="mt-1"
                      />
                      <div className="text-sm">
                        <div className="font-medium">{address.full_name}</div>
                        <div className="text-xs text-gray-600">
                          {address.phone_number} • {address.street_address},{" "}
                          {address.city}, {address.state} •{" "}
                          {address.postal_code}
                        </div>
                        <div className="text-xs text-gray-600">
                          {address.country}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Proceed button (disabled unless an address selected) */}
              <div className="mt-6 flex justify-between">
                <button
                  className="text-green-600 border-1 p-1"
                  onClick={handleAddressButton}
                >
                  Add New Address
                </button>
                <button
                  onClick={handleProceed}
                  disabled={!selectedAddress}
                  className={`px-6 py-2 rounded text-white font-medium transition cursor-pointer ${
                    selectedAddress
                      ? "bg-black hover:opacity-90"
                      : "bg-gray-300 cursor-not-allowed opacity-60"
                  }`}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <h1>No addresses found. Please add one.</h1>
            </div>
          )}
        </div>
      </div>
      
      {/* LEFT: Add / Edit Address Form (kept as-is) */}
      {showFields ? (
        <form
          className="flex flex-col gap-4 w-full sm:max-w-[480px]"
          
        >
          <div className="text-xl sm:text-2xl my-3">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          <div>
            <div className="flex gap-3">
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full my-2"
                type="text"
                placeholder="First name"
                name="first_name"
                required
              />
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full my-2"
                type="text"
                placeholder="Last name"
                name="last_name"
                required
              />
            </div>

            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full my-2"
              type="email"
              placeholder="Email address"
              name="email"
              required
            />
            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full my-2"
              type="text"
              placeholder="Street"
              name="street_address"
              required
            />

            <div className="flex gap-3">
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full my-2"
                type="text"
                placeholder="City"
                name="city"
                required
              />
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full my-2"
                type="text"
                placeholder="State"
                name="state"
                required
              />
            </div>

            <div className="flex gap-3">
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full my-2"
                type="number"
                placeholder="ZipCode"
                name="postal_code"
                required
              />
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full my-2"
                type="text"
                placeholder="Country"
                name="country"
                required
              />
            </div>

            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full my-2"
              type="number"
              placeholder="Phone"
              name="phone_number"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 px-6 py-2 rounded bg-black text-white font-medium hover:opacity-90"
          >
            Save Address
          </button>
        </form>
      ) : (
        <div></div>
      )}

      
    </div>
  );
};

export default SelectAddress;
