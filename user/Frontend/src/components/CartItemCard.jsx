/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux"
import { updateCart } from '../redux/cartSlice';

function CartItemCard({ name, price, quantity, image, id }) {
    const dispatch = useDispatch()

    return (
        <div className="border-t border-b border-gray-300">
            <div className="flex items-center gap-10">
                <div className="w-20 ">
                    <img className="w-full h-auto object-cover" src={image} alt={name} />
                </div>

                <div className="flex-1 pt-3">
                    <p className="font-medium">{name}</p>
                    {/* <p className="text-sm text-gray-500">Cotton T-shirt</p> */}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        className="px-2 text-lg font-bold text-gray-600 hover:text-black"
                        onClick={() => dispatch(updateCart({ itemId: id, quantity: 1 }))}
                    >
                        -
                    </button>
                    <span className="px-2 py-1 border text-gray-500 text-sm rounded">
                        {quantity}
                    </span>
                    <button
                        className="px-2 text-lg font-bold text-gray-600 hover:text-black"
                        onClick={() => dispatch(updateCart({ itemId: id, quantity: 1 }))}
                    >
                        +
                    </button>
                </div>

                <div className="flex items-center gap-5 text-gray-500">
                    <span className='px-3'>{price} $</span>
                    <button
                        className="text-red-500 hover:text-red-700 text-4xl"
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