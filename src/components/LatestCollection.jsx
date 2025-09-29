import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
      setLoading(false);
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          These are best products in the world don’t miss the opportunity
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-2xl">Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {latestProducts.map((item) => (
            <ProductItem
              key={item.id}
              image={
                item.images && item.images.length > 0 ? item.images[0].url : null
              }
              price={item.newprice}
              name={item.name}
              id={item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestCollection;
