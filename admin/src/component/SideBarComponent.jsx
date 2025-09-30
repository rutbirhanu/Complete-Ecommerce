import { Link } from 'react-router-dom';
import {FaBoxOpen, FaShoppingCart, FaUserCircle } from 'react-icons/fa';


function SideBarComponent() {
  return (
    <div className="w-[12em] h-screen sticky top-0 flex flex-col gap-8 p-6 bg-gradient-to-b from-[#1f1f2e] to-[#12121a] text-white shadow-[2px_0_8px_rgba(0,0,0,0.3)]">
      <h2 className="text-xl font-bold text-center">🧾 MyDashboard</h2>

      <div className="flex flex-col gap-4">
        <Link
          to="/"
          className="flex items-center gap-3 text-base font-medium px-4 py-3 text-gray-200 rounded-xl hover:bg-[#1d3b7b] transition-all duration-300"
        >
          <FaBoxOpen/> <span>Add Product</span>
        </Link>
        <Link
          to="/products"
          className="flex items-center gap-3 text-base font-medium px-4 py-3 text-gray-200 rounded-xl hover:bg-[#1d3b7b] transition-all duration-300"
        >
          <FaBoxOpen /> <span>Products</span>
        </Link>
        <Link
          to="/orders"
          className="flex items-center gap-3 text-base font-medium px-4 py-3 text-gray-200 rounded-xl hover:bg-[#1d3b7b] transition-all duration-300"
        >
          <FaShoppingCart /> <span>Orders</span>
        </Link>
        <Link
          to="/customers"
          className="flex items-center gap-3 text-base font-medium px-4 py-3 text-gray-200 rounded-xl"
        >
          <FaUserCircle /> <span>Customers</span>
        </Link>
      </div>
    </div>
  );
}


export default SideBarComponent