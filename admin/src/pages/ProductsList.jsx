import { useEffect } from "react";
import InfoCard from "../component/InfoCard";
import SideBarComponent from "../component/SideBarComponent"
import "./addProduct.css"
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { fetchProduct } from "../redux/productSlice";


function ProductsList() {
    const dispatch = useDispatch()
    const { isLoading, error, products } = useSelector(state => state.product)
    
    useEffect(() => {
        dispatch(fetchProduct())
    },[])

    return (
        <div className="orders-page-container">
            <SideBarComponent />
            <div className="orders-page-content">
                <h1>Products</h1>
                <InfoCard />
                <div className="orders-table-wrapper">
                    <div className="table-wrapper">
                    <table className="orders-table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price ($)</th>
                            <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                products.map(product => {
                                    return <tr key={product._id}>
                                    <td>1</td>
                                    <td><img src={product.image[0].path} alt="cargo" /></td>
                                        <td>{ product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                    <td><AiFillDelete style={{ color: "red", height: "1.4em", width: "1.2em" }} />
                                        <MdEdit style={{ color: "blue", height: "1.4em", width: "1.2em", marginLeft: "15px" }} />
                                    </td>
                                </tr>
                                })
                            }
                        </tbody>
                        </table>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsList