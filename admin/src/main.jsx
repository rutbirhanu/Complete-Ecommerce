import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom"
import './index.css'
import { Provider } from "react-redux"
import store from "./redux/store.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
        </Provider>
    </Router>
  </StrictMode>,
)
