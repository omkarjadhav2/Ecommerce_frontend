import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { AuthContext } from "../context/AuthContext";

const Orders = () => {
  const { orders, currency , getOrderItems } = useContext(ShopContext);
    const { authTokens } = useContext(AuthContext);
  

  useEffect(() => {
    getOrderItems(authTokens)
  }, []);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orders.map((order, orderIndex) => (
          <div key={orderIndex} className="mb-8">
            {/* Order level info */}
            <p className="font-semibold mb-2">
              Order #{order.id} — {order.order_status} ({order.payment_status})
            </p>
            <p className="text-gray-500 mb-4">
              Total: {currency}
              {order.total_amount} | Date:{" "}
              {new Date(order.created_at).toLocaleDateString()}
            </p>

            {/* Items inside this order */}
            {order.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-start gap-6 text-sm">
                  <img
                    className="w-16 sm:w-20"
                    src={item.product.images?.[0]?.url}
                    alt={item.product.name}
                  />
                  <div>
                    <p className="text-base font-medium">
                      {item.product.name}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                      <p>
                        {currency}
                        {item.price_at_purchase}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">{order.order_status}</p>
                  </div>
                  <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
