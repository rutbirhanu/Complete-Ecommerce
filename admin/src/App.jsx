import "./pages/addProduct.css"
import { Route, Routes } from 'react-router-dom'
import AddProduct from './pages/AddProduct'

function App() {

  return (
    <Routes>
      <Route path='/add-product' exact element={<AddProduct />} />
    </Routes>
  )
}

export default App
