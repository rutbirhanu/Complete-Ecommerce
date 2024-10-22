import SideBarComponent from "../component/SideBarComponent"
import "./addProduct.css"
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

function ProductsList() {
    return (
        <div className="customer-page-container">
            <SideBarComponent />
            <div className="customers-page-content">
                <h2>Products</h2>
                <div className="products-list">
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price ($)</th>
                            <th>Actions</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td><img src="https://www.runningbare.com.au/productimages/magnify/1/2229_19533_9089.jpg" alt="cargo" /></td>
                            <td>Cargo Pants</td>
                            <td>Women</td>
                            <td>1000</td>
                            <td><AiFillDelete style={{ color: "red", height: "1.4em", width: "1.2em" }} />
                                <MdEdit style={{ color: "blue", height: "1.4em", width: "1.2em", marginLeft: "15px" }} />
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td><img src="https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-blossom-slingback-pump--AP8E6GLK02_PM2_Front%20view.jpg" alt="cargo" /></td>
                            <td>Cargo Pants</td>
                            <td>Women</td>
                            <td>1000</td>
                            <td><AiFillDelete style={{ color: "red", height: "1.4em", width: "1.2em" }} />
                                <MdEdit style={{ color: "blue", height: "1.4em", width: "1.2em", marginLeft: "15px" }} />
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td><img src="https://asia.christianlouboutin.com/media/catalog/product/cache/28/thumbnail/9df78eab33525d08d6e5fb8d27136e95/3/1/3/0/christianlouboutin-sokate-3130694_BK01_1_1200x1200_1721215134_3.jpg" alt="cargo" /></td>
                            <td>Cargo Pants</td>
                            <td>Women</td>
                            <td>1000</td>
                            <td><AiFillDelete style={{ color: "red", height: "1.4em", width: "1.2em" }} />
                                <MdEdit style={{ color: "blue", height: "1.4em", width: "1.2em", marginLeft: "15px" }} />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductsList