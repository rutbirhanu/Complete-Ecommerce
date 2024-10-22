import SideBarComponent from "../component/SideBarComponent"
import "./customersPage.css"

function CustomersPage() {
  return (
    <div className="customer-page-container">
      <SideBarComponent />
      <div className="customers-page-content">
        <h2>Customers</h2>
        <div className="customers-list">
          <table>
            <tr>
              <th>Id</th>
              <th>Email</th>
            </tr>
            <tr>
              <td>1234</td>
              <td>birha@gmail.com</td>
            </tr>
            <tr>
              <td>1234</td>
              <td>birha@gmail.com</td>
            </tr>
            <tr>
              <td>1234</td>
              <td>birha@gmail.com</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CustomersPage