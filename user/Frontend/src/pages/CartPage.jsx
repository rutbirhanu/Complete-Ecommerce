import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "../components/cartItemCard";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { fetchUserCart } from "../redux/cartSlice";

function CartPage() {
  const { products, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserCart());
  }, [dispatch]);

  const makePayment = async () => {
    const stripe = await loadStripe(
      import.meta.env.VITE_API_STRIPE_PUBLISHABLE_KEY
    );
    const response = await fetch("http://localhost:3500/order/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        total: totalPrice,
        address: "ethiopia",
        items: products,
      }),
    });

    const session = await response.json();
    console.log("this is payment")
    console.log(session)
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="min-h-screen flex bg-[#ecf0f3] font-sans text-sm font-bold">
      <div className="m-auto max-w-5xl w-[90%] rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Cart Section */}
        <div className="flex-1 bg-white p-6 md:p-10 rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-bold">Shopping Cart</h4>
              <span className="text-gray-500">{totalQuantity} items</span>
            </div>
          </div>

          {products.map((product) => (
            <CartItemCard
              key={product._id}
              name={product.name}
              id={product._id}
              quantity={product.quantity}
              price={product.price}
              image={product.image}
            />
          ))}

          <div
            className="mt-12 flex items-center gap-2 text-gray-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <a className="text-lg">&larr;</a>
            <span>Back to Shop</span>
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-full md:w-1/3 bg-[#ecf0f3] p-6 md:p-10 rounded-b-xl md:rounded-r-xl md:rounded-bl-none text-gray-700">
          <h5 className="text-lg font-bold mb-4">Summary</h5>
          <hr className="mb-4" />

          <form className="space-y-4">
            <div>
              <p className="mb-2">SHIPPING</p>
              <select className="w-full rounded-xl border-none outline-none bg-white shadow-[inset_4px_4px_4px_#cbced1,inset_-3px_-3px_3px_#fff] px-6 py-2">
                <option>Standard Delivery - 5.00 $</option>
              </select>
            </div>
            <div>
              <p className="mb-2">GIVE CODE</p>
              <input
                id="code"
                placeholder="Enter your code"
                className="w-full rounded-xl border-none outline-none bg-white shadow-[inset_4px_4px_4px_#cbced1,inset_-3px_-3px_3px_#fff] px-4 py-2 placeholder-gray-400"
              />
            </div>
          </form>

          <div className="flex justify-between border-t border-gray-300 mt-6 pt-4">
            <span>TOTAL PRICE</span>
            <span>{totalPrice} $</span>
          </div>

          <div className="mt-6">
            <ButtonComponent
              desc="Checkout"
              onclick={makePayment}
              showLoading={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
