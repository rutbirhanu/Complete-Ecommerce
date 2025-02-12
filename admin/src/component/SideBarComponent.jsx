import "./component.css"
import { Link } from 'react-router-dom';
import { FaUsers, FaBoxOpen, FaShoppingCart, FaUserCircle } from 'react-icons/fa';

function SideBarComponent() {
  return (
    <div className="side-bar-container">
      <h2 className="logo-title">🧾 MyDashboard</h2>
      <div className="nav-links">
        <Link to="/customers" className="nav-link"><FaUsers /> <span>Users</span></Link>
        <Link to="/products" className="nav-link"><FaBoxOpen /> <span>Products</span></Link>
        <Link to="/orders" className="nav-link"><FaShoppingCart /> <span>Orders</span></Link>
        <div className="nav-link inactive-link"><FaUserCircle /> <span>Customers</span></div>
      </div>
    </div>
  );
}


export default SideBarComponent