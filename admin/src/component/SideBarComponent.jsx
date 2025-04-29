import "./component.css"
import { Link } from 'react-router-dom';


function SideBarComponent() {
  return (
      <div className="side-bar-container">
          <h2>Dashboard</h2>
          <div>
              <Link to="/customers"><p>Users</p></Link>
             <Link to="/products"><p>Products</p></Link> 
              <Link to ="/orders"><p>Orders</p></Link>
              <p>Customers</p>
          </div>
    </div>
  )
}

export default SideBarComponent