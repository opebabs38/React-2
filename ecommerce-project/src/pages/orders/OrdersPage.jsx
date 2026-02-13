import { Header } from '../../components/Header';
import './OrdersPage.css';
import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';


export function OrdersPage({ cart }) {
    // the below variable is to receive the orders data from the backend and store it in the state so that we can use it to display the orders on the orders page, we will use the useState hook to create a state variable called orders and a function to update it called setOrders, we will initialize the orders state variable as an empty array because we will be storing an array of orders in it
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/orders?expand=products') // the expand query parameter is used to tell the backend to include the order items data for each order in the response, this way we can access the order items data for each order without having to make a separate request to the backend for each order
            .then((response) => {
                setOrders(response.data);
            });
    }, []);

    return (
        <>
            <title>Orders</title>

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">
                    {/* the below loop is used to generate an order container for each order in the orders array, we are using the .map method to loop through each order in the orders array and create an order container for each one */}
                    {orders.map((order) => {
                        return (
                            <div key={order.id} className="order-container">

                                <div className="order-header">
                                    <div className="order-header-left-section">
                                        <div className="order-date">
                                            <div className="order-header-label">Order Placed:</div>
                                            <div>{dayjs(order.orderTimesMs).format('dddd, MMMM, D')}</div>
                                        </div>
                                        <div className="order-total">
                                            <div className="order-header-label">Total:</div>
                                            <div>{formatMoney(order.totalCostCents)}</div>
                                        </div>
                                    </div>

                                    <div className="order-header-right-section">
                                        <div className="order-header-label">Order ID:</div>
                                        <div>{order.id}</div>
                                    </div>
                                </div>

                                <div className="order-details-grid">
                                    {order.products.map((orderProduct) => { // we are using the .map method to loop through each product in the order's products array and create a product details section for each one, we are not using the product data from the backend in this section because we are using hardcoded data for the product details, but in a real application we would use the product data from the backend to display the correct product details for each product in the order
                                        return (
                                            <Fragment key={orderProduct.product.id} > {/* since we are trying to return multiple elements, we use a fragment and the fragment must be written fully so that it can be given a key prop*/}
                                                <div className="product-image-container">
                                                    <img src={orderProduct.product.image} />
                                                </div>

                                                <div className="product-details">
                                                    <div className="product-name">{orderProduct.product.name}</div>
                                                    <div className="product-delivery-date">Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM, D')}</div>
                                                    <div className="product-quantity">Quantity: {orderProduct.quantity}</div>
                                                    <button className="buy-again-button button-primary">
                                                        <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                                        <span className="buy-again-message">Add to Cart</span>
                                                    </button>
                                                </div>

                                                <div className="product-actions">
                                                    <a href="/tracking">
                                                        <button className="track-package-button button-secondary">
                                                            Track package
                                                        </button>
                                                    </a>
                                                </div>
                                            </Fragment>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}