import { useEffect } from "react";
import InfoCard from "../component/InfoCard";
import SideBarComponent from "../component/SideBarComponent"
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { fetchProduct } from "../redux/productSlice";


function ProductsList() {
    const dispatch = useDispatch()
    const { isLoading, error, products } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(fetchProduct())
    }, [])

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            <SideBarComponent />

            <div className="flex-grow flex flex-col items-center p-8 md:p-12 w-full">
                <h1 className="text-2xl font-semibold mb-6 text-[#1d3b7b]">Products</h1>

                <InfoCard />

                <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto w-full max-w-6xl mt-6">
                    <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                        <table className="w-full border-collapse text-gray-800 text-sm">
                            <thead className="bg-blue-100 text-left">
                                <tr>
                                    <th className="py-2 px-4">Id</th>
                                    {/* <th className="py-2 px-4">Image</th> */}
                                    <th className="py-2 px-4">Product Name</th>
                                    <th className="py-2 px-4">Category</th>
                                    <th className="py-2 px-4">Price ($)</th>
                                    <th className="py-2 px-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((product, idx) => (
                                    <tr key={product._id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                                        <td className="py-2 px-4">{idx + 1}</td>
                                        {/* <td className="py-2 px-4">
                                            <img
                                                src={product.image[0].path}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td> */}
                                        <td className="py-2 px-4">{product.name}</td>
                                        <td className="py-2 px-4">{product.category}</td>
                                        <td className="py-2 px-4">{product.price}</td>
                                        <td className="py-2 px-4 flex items-center">
                                            <AiFillDelete className="text-red-500 w-5 h-5 cursor-pointer" />
                                            <MdEdit className="text-blue-500 w-5 h-5 ml-4 cursor-pointer" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductsList