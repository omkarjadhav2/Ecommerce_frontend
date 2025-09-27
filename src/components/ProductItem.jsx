import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="block group bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
    >
      {/* Image */}
      <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Quick View / Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
          <span className="text-white text-sm bg-black/60 px-3 py-1 rounded-lg">
            View Details
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <h3 className="text-gray-800 font-semibold text-base truncate">
          {name}
        </h3>
        <p className="text-gray-600 text-sm mt-1">{currency}{price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
