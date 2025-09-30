import { useEffect, useState } from "react";


function OrderPage() {
  const steps = ["Order Placed", "Order On The Way", "Delivered"];
  const [current, setCurrent] = useState(1);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const userOrder = async () => {
      try {
        const req = await fetch("http://localhost:3500/order/user-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const response = await req.json();
        setOrderItems(response);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    userOrder();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      {/* Track Order */}
      <div className="p-6 mb-8">
        <h4 className="mb-8 font-bold text-[21px] text-center">
          Track Your Order
        </h4>
        <div className="flex items-center justify-center gap-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center relative"
            >
              <div
                className={`flex items-center justify-center w-[30px] h-[30px] rounded-full z-10 font-semibold 
                ${current === i + 1 ? "bg-green-400 text-white" : "bg-gray-300 text-gray-700"}`}
              >
                {i + 1}
              </div>
              <p className="text-[13px] font-medium mt-1">{step}</p>
              {i < steps.length - 1 && (
                <div className="absolute w-[120px] h-[2px] bg-gray-300 top-[15px] left-[50px]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Order History */}
      <div className="p-6 mx-4 rounded-2xl shadow-md bg-white">
        <h4 className="mb-4 font-bold text-[21px] text-center">Order History</h4>
        <table className="w-[90%] mx-auto border-collapse">
          <thead>
            <tr>
              <th className="bg-gray-800 text-white py-2 px-3">Date</th>
              <th className="bg-gray-800 text-white py-2 px-3">Quantity</th>
              <th className="bg-gray-800 text-white py-2 px-3">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-200">
              <td className="py-2 px-3 text-center">1/2/2024</td>
              <td className="py-2 px-3 text-center">6</td>
              <td className="py-2 px-3 text-center">$540</td>
            </tr>
            <tr>
              <td className="py-2 px-3 text-center">1/2/2024</td>
              <td className="py-2 px-3 text-center">5</td>
              <td className="py-2 px-3 text-center">$450</td>
            </tr>
            <tr className="bg-gray-200">
              <td className="py-2 px-3 text-center">1/2/2024</td>
              <td className="py-2 px-3 text-center">5</td>
              <td className="py-2 px-3 text-center">$300</td>
            </tr>
            <tr>
              <td className="py-2 px-3 text-center">1/2/2024</td>
              <td className="py-2 px-3 text-center">5</td>
              <td className="py-2 px-3 text-center">$220</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderPage;
