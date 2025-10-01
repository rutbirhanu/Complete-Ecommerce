/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from "react-redux"
import { updateCart } from '../redux/cartSlice';

function CartItemCard({ name, price, quantity, image, id }) {
    const dispatch = useDispatch()

    return (
        <div className="border-t border-b py-4">
            <div className="flex items-center justify-between gap-4">
                {/* Product Image */}
                <div className="w-20">
                    <img className="w-full h-auto object-cover" src={image} alt={name} />
                </div>

                {/* Product Name */}
                <div className="flex-1">
                    <p className="font-medium">{name}</p>
                    {/* <p className="text-sm text-gray-500">Cotton T-shirt</p> */}
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                    <button
                        className="px-2 text-lg font-bold text-gray-600 hover:text-black"
                        onClick={() => dispatch(updateCart({ itemId: id, quantity: 1 }))}
                    >
                        -
                    </button>
                    <span className="px-3 py-1 border text-gray-500 text-sm rounded">
                        {quantity}
                    </span>
                    <button
                        className="px-2 text-lg font-bold text-gray-600 hover:text-black"
                        onClick={() => dispatch(updateCart({ itemId: id, quantity: 1 }))}
                    >
                        +
                    </button>
                </div>

                {/* Price & Remove */}
                <div className="flex items-center gap-2 text-gray-500">
                    <span>{price} $</span>
                    <button
                        className="text-red-500 hover:text-red-700 text-lg"
                        onClick={() => dispatch(updateCart({ itemId: id, quantity: 0 }))}
                    >
                        &times;
                    </button>
                </div>
            </div>
        </div>

    )
}

export default CartItemCard