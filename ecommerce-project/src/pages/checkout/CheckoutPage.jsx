import './checkout-header.css';
import './CheckoutPage.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function CheckoutPage({ cart }) { // this is to access the cart data passed from the App component
    const [deliveryOptions, setDeliveryOptions] = useState([]); // this is used to save the delivery options data that we will fetch from the server, we are using useState to create a state variable called deliveryOptions and a function to update it called setDeliveryOptions, we are initializing it with an empty array because we expect to receive an array of delivery options from the server
    const [paymentSummary, setPaymentSummary] = useState(null); // this is used to save the payment summary data that we will fetch from the server, we are using useState to create a state variable called paymentSummary and a function to update it called setPaymentSummary, we are initializing it with null because we expect to receive an object with the payment summary data from the server

    useEffect(() => { // 
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime') // this is used to fetch the delivery options data from the server, we are using axios to make a GET request to the /api/delivery-options endpoint, this will return a promise that resolves to the response from the server
            .then((response) => {
                setDeliveryOptions(response.data);
            })

        axios.get('/api/payment-summary') // this is used to fetch the payment summary data from the server, we are using axios to make a GET request to the /api/payment-summary endpoint, this will return a promise that resolves to the response from the server
            .then((response) => {
                setPaymentSummary(response.data);
            });
    }, [])
    return (
        <>
            <title>Checkout Page</title> {/* the title is here because we want the webpage to display the correct title, do this for all the other pages to give them the correct title */}
            <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>
                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

                    {/* the below section is for generating the payment summary from the backend */}
                    <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div>
        </>
    );
}