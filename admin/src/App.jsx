import "./pages/addProduct.css"
import { Route, Routes } from 'react-router-dom'
import AddProduct from './pages/AddProduct'
import CustomersPage from "./pages/CustomersPage"
import OrdersPage from "./pages/OrdersPage"
import ProductsList from "./pages/ProductsList"

function App() {

  return (
    <Routes>
      <Route path='/add-product' exact element={<AddProduct />} />
      <Route path='/customers' element={<CustomersPage />} />
      <Route path='/orders' element={<OrdersPage />} />
      <Route path='/products' element={<ProductsList />} />
    </Routes>
  )
}

export default App
