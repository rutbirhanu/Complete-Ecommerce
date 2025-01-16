import { useNavigate } from "react-router-dom"
import "./pages.css"

function SuccessPage() {
  const navigate = useNavigate()

  return (
      <div className="success-container">
          <img src="https://t3.ftcdn.net/jpg/01/57/86/44/360_F_157864480_TFm1nQsUI1o8VLKg6SK6yV9P6tsK4TXN.jpg" alt="success" />
      <h4>Success</h4>
      <div className="back-to-shop" onClick={()=>navigate("/orders")}><a href="#">&larr;</a><span className="text-muted">Your Orders</span></div>
    </div>
  )
}

export default SuccessPage