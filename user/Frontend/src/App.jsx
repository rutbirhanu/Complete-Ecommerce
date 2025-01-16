import { Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailsPage from "./pages/DetailsPage";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import CartPage from "./pages/CartPage";
import CategoryItemsPage from "./pages/CategoryItemsPage";
import Map from "./pages/Map";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import OrderPage from "./pages/OrderPage";
import { useEffect, useState } from "react";
import Verify from "./pages/Verify";
import { requestFCMToken } from "./firebase";
import { useDispatch} from "react-redux"
import { setProduct } from "./redux/productSlice"
import { Items } from "./assets/data/items"



function App() {

//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/firebase-messaging-sw.js')
//     .then(function(registration) {
//         console.log('Service Worker registration successful with scope: ', registration.scope);
//     }).catch(function(err) {
//         console.log('Service Worker registration failed: ', err);
//     });
  // }
  


  const [fcmToken, setFcmToken] = useState(null)
  const dispatch = useDispatch()

  
  useEffect(() => {
    dispatch(setProduct(Items))

  }, [])

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        // const token = await requestFCMToken()
        // setFcmToken(token)
        // console.log(token)
        // const response = await fetch("http://localhost:3500/product/notification", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json"
        //   }
        // })
        // const userData = await response.json()
        // console.log(userData.message.notification)
        
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchNotification()
  },[])


  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/product-detail/:id" element={<DetailsPage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/map" element={<Map />} />
      <Route path="/orders" element={<OrderPage />} />
      <Route path="/verify" element={<Verify/>}/>
      <Route path="/category-items/:category" element={<CategoryItemsPage />} />
    </Routes>
  )
}

export default App
