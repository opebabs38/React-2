import { Routes, Route } from 'react-router';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('/api/cart-items?expand=product') // the expand query parameter is used to tell the backend to include the product data for each cart item in the response, this way we can access the product data for each cart item without having to make a separate request to the backend for each product
      .then((response) => {
        setCart(response.data);
      });
  }, []);


  return (
    <Routes>
      <Route index element={<HomePage  cart={cart}/>} /> {/* path="/" can be simplified to index and since there is nothing between the <Route></Route>, then it be simplified into a self closing tag <Route />*/}
      <Route path="checkout" element={<CheckoutPage cart={cart} />} /> {/* here we added a prop cart so that the cart data is available in the checkout page and the homepage*/}
      <Route path="orders" element={<OrdersPage cart={cart} />}/>
      <Route path="tracking" element= {<TrackingPage />} />
    </Routes>
  )
}

export default App
