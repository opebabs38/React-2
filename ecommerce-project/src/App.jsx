import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} /> {/* path="/" can be simplified to index and since there is nother between the <Route></Route>, then it be simplified into a self closing tag <Route />*/}
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<OrdersPage />}/>
      <Route path="tracking" element= {<TrackingPage />} />
    </Routes>
  )
}

export default App
