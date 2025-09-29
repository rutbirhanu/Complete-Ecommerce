import SideBarComponent from "../component/SideBarComponent";

function OrdersPage() {
    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            <SideBarComponent />

            <div className="flex-grow flex flex-col items-center p-8 md:p-12 w-full">
                <h2 className="text-2xl font-semibold mb-6 text-[#1d3b7b]">Orders Overview</h2>

                <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto w-full max-w-6xl">
                    <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                        <table className="w-full border-collapse text-gray-800 text-sm">
                            <thead className="bg-blue-100 text-left">
                                <tr>
                                    <th className="py-2 px-4">Order ID</th>
                                    <th className="py-2 px-4">User ID</th>
                                    <th className="py-2 px-4">Items Ordered</th>
                                    <th className="py-2 px-4">Total Price</th>
                                    <th className="py-2 px-4">Order Date</th>
                                    <th className="py-2 px-4">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="bg-gray-50">
                                    <td className="py-2 px-4">1</td>
                                    <td className="py-2 px-4">1234</td>
                                    <td className="py-2 px-4">Shoe</td>
                                    <td className="py-2 px-4">$1000</td>
                                    <td className="py-2 px-4">Sept 1, 2024</td>
                                    <td>
                                        <span className="inline-block px-3 py-1 text-green-600 bg-green-100 rounded-full text-xs font-semibold capitalize">
                                            Paid
                                        </span>
                                    </td>
                                </tr>

                                <tr className="bg-gray-100">
                                    <td className="py-2 px-4">2</td>
                                    <td className="py-2 px-4">2378</td>
                                    <td className="py-2 px-4 max-w-[250px] break-words whitespace-normal leading-5 max-h-24 overflow-y-auto">
                                        T-shirt, Jeans, Jacket, Shoes, Hat, Socks, Glasses, Belt, Gloves, Watch, Backpack, Cap, Coat, Scarf, Sweater
                                    </td>
                                    <td className="py-2 px-4">$1390</td>
                                    <td className="py-2 px-4">Sept 1, 2024</td>
                                    <td>
                                        <span className="inline-block px-3 py-1 text-blue-600 bg-blue-100 rounded-full text-xs font-semibold capitalize">
                                            Delivered
                                        </span>
                                    </td>
                                </tr>

                                <tr className="bg-gray-50">
                                    <td className="py-2 px-4">3</td>
                                    <td className="py-2 px-4">0987</td>
                                    <td className="py-2 px-4">T-shirt</td>
                                    <td className="py-2 px-4">$87</td>
                                    <td className="py-2 px-4">Sept 1, 2024</td>
                                    <td>
                                        <span className="inline-block px-3 py-1 text-yellow-600 bg-yellow-100 rounded-full text-xs font-semibold capitalize">
                                            On the way
                                        </span>
                                    </td>
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
