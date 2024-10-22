import SideBarComponent from "../component/SideBarComponent"
import "./customersPage.css"

function OrdersPage() {
    return (
        <div className="customer-page-container">
            <SideBarComponent />
            <div className="customers-page-content">
                <h2>Customers</h2>
                <div className="customers-list">
                    <table>
                        <tr>
                            <th>Order ID</th>
                            <th>User ID</th>
                            <th>Items Ordered</th>
                            <th>Total Price</th>
                            <th>Order Date</th>
                            <th>Order Status</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>1234</td>
                            <td>shoe</td>
                            <td>1000</td>
                            <td>Sept 1 , 2024</td>
                            <td>paid</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>2378</td>
                            <td>cargo</td>
                            <td>1390</td>
                            <td>Sept 1 , 2024</td>
                            <td>delivered</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>0987</td>
                            <td>T-shirt</td>
                            <td>87</td>
                            <td>Sept 1 , 2024</td>
                            <td>On the way</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>0987</td>
                            <td>T-shirt</td>
                            <td>87</td>
                            <td>Sept 1 , 2024</td>
                            <td>On the way</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>0987</td>
                            <td>T-shirt</td>
                            <td>87</td>
                            <td>Sept 1 , 2024</td>
                            <td>On the way</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OrdersPage