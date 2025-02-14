import SideBarComponent from "../component/SideBarComponent";
import "./customersPage.css";

function OrdersPage() {
    return (
        <div className="orders-page-container">
            <SideBarComponent />
            <div className="orders-page-content">
                <h2>Orders Overview</h2>
                <div className="orders-table-wrapper">
                    <div className="table-wrapper">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>User ID</th>
                                <th>Items Ordered</th>
                                <th>Total Price</th>
                                <th>Order Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>1234</td>
                                <td>Shoe</td>
                                <td>$1000</td>
                                <td>Sept 1, 2024</td>
                                <td><span className="status paid">Paid</span></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>2378</td>
                                <td className="items-cell scrollable">
                                    T-shirt, Jeans, Jacket, Shoes, Hat, Socks, Glasses, Belt, Gloves, Watch, Backpack, Cap, Coat, Scarf, Sweater
                                </td>

                                <td>$1390</td>
                                <td>Sept 1, 2024</td>
                                <td><span className="status delivered">Delivered</span></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>0987</td>
                                <td>T-shirt</td>
                                <td>$87</td>
                                <td>Sept 1, 2024</td>
                                <td><span className="status on-the-way">On the way</span></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrdersPage;
