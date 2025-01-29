/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from "react-redux"
import { updateCart } from '../redux/cartSlice';

function CartItemCard({ name, price, quantity, image, id }) {
    const dispatch = useDispatch()

    return (
        <div className="row border-top border-bottom">
            <div className="row main align-items-center">
                <div className="col-2"><img className="img-fluid" src={image} /></div>
                <div className="col">
                    <div className="row">{name}</div>
                    {/* <div className="row">Cotton T-shirt</div> */}
                </div>
                <div className="col">
                    <a href="#" onClick={() => (dispatch(updateCart({itemId:id, quantity:1 })))} >-</a><a href="#" className="border text-muted" style={{ fontSize: "13px" }}>{quantity}</a><a href="#" onClick={() => { dispatch(updateCart({itemId:id, quantity:1 })) }}>+</a>
                </div>
                <div className="col text-muted">{price} $<span className="close" onClick={() => (dispatch(updateCart({itemId:id, quantity:0})))}>&#10005;</span></div>
            </div>
        </div>
    )
}

export default CartItemCard