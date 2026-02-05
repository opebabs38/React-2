import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('/api/cart-items')
      .then((response) => {
        setCart(response.data);
      });
  }, []);


  return (
    <Routes>
      <Route index element={<HomePage  cart={cart}/>} /> {/* path="/" can be simplified to index and since there is nothing between the <Route></Route>, then it be simplified into a self closing tag <Route />*/}
      <Route path="checkout" element={<CheckoutPage cart={cart} />} /> {/* here we added a prop cart so that the cart data is available in the checkout page and the homepage*/}
      <Route path="orders" element={<OrdersPage />}/>
      <Route path="tracking" element= {<TrackingPage />} />
    </Routes>
  )
}

export default App
