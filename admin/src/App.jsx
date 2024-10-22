import "./pages/addProduct.css"
import { Route, Routes } from 'react-router-dom'
import AddProduct from './pages/AddProduct'
import CustomersPage from "./pages/CustomersPage"
import OrdersPage from "./pages/OrdersPage"

function App() {

  return (
    <Routes>
      <Route path='/add-product' exact element={<AddProduct />} />
      <Route path='/customers' element={<CustomersPage />} />
      <Route path='/orders' element={<OrdersPage />} />
    </Routes>
  )
}

export default App
