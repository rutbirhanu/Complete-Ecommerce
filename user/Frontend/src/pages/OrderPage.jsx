import { useEffect, useState } from "react"
import "./cart.css"

function OrderPage() {
  const steps = ["Order Placed", "Order On The Way", "Delivered"]
  const [current, setCurrent] = useState(1)
  const [orderItems, setOrderItems]= useState([])
  
  useEffect(() => {
    const userOrder = async () => {
      try {
        const req = await fetch("http://localhost:3500/order/user-order", {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          credentials:"include"
        })
        const response = await req.json()
        setOrderItems(response)
        console.log(response)
      }
      catch (err) {
        console.log(err)
        
      }
    }
    userOrder ()
  },[])
  
  return (
    <div className="order-parent-container">
      <div className="order-track-container">
        <h4>Track Your Order</h4>
        <div className="stepper-container">
        {
          steps.map((step, i) => (
            <div key={i} className={`order-stepper ${current=== i+1 && "active"}`}>
              <div className="step">{i + 1}</div>
              <p>{step}</p>
            </div>
          ))
        }
        </div>

      </div>
      <div className="order-history">
        <h4>Order History</h4>
        <table>
          <tr>
            <th>Date</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          <tr>
            <td>1/2/2024</td>
            <td>6</td>
            <td>540$</td>
          </tr>
          <tr>
            <td>1/2/2024</td>
            <td>5</td>
            <td>540$</td>
          </tr>
          <tr>
            <td>1/2/2024</td>
            <td>5</td>
            <td>540$</td>
          </tr>
          <tr>
            <td>1/2/2024</td>
            <td>5</td>
            <td>540$</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default OrderPage