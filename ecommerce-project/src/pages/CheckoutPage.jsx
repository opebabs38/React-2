import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import './checkout-header.css';
import './CheckoutPage.css';
import { formatMoney } from '../utils/money';

export function CheckoutPage({ cart }) { // this is to access the cart data passed from the App component
    const [deliveryOptions, setDeliveryOptions] = useState([]); // this is used to save the delivery options data that we will fetch from the server, we are using useState to create a state variable called deliveryOptions and a function to update it called setDeliveryOptions, we are initializing it with an empty array because we expect to receive an array of delivery options from the server

    useEffect(() => { // 
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime') // this is used to fetch the delivery options data from the server, we are using axios to make a GET request to the /api/delivery-options endpoint, this will return a promise that resolves to the response from the server
            .then((response) => {
                setDeliveryOptions(response.data);
            })
    }, [])
    return (
        <>
            <title>Checkout Page</title> {/* the title is here because we want the webpage to display the correct title, do this for all the other pages to give them the correct title */}
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section"> Checkout (<a className="return-to-home-link" href="/">3 items</a>)</div>
                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>
                <div className="checkout-grid">
                    <div className="order-summary">
                        {deliveryOptions.length > 0 && cart.map((cartItem) => { // this is used to generate a cart item container for each item in the cart, we are using the .map method to loop through each item in the cart array and create a cart item container for each one
                        // we are also checking if the deliveryOptions array has any data in it before we try to render the cart items, this is because we need the delivery options data to render the cart items correctly, if we try to render the cart items before we have the delivery options data, we will get an error because we will be trying to access properties of undefined
                            const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => { // this is used to find the delivery option that is currently selected for the cart item, we are using the .find method to loop through each delivery option and return the one that has the same id as the cart item's deliveryOptionId
                                return deliveryOption.id === cartItem.deliveryOptionId;
                            });

                            return (
                                <div key={cartItem.productId} className="cart-item-container"> {/* when we loop through an array, each element has to be given a key prop so that react can properly track changes. each key has to be unique so it is best to use the cartItem's productId to differentiate */}
                                    <div className="delivery-date"> Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM, D')}</div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image" src={cartItem.product.image} />

                                        <div className="cart-item-details">
                                            <div className="product-name">{cartItem.product.name}</div>
                                            <div className="product-price">{formatMoney(cartItem.product.priceCents)}</div>
                                            <div className="product-quantity">
                                                <span> Quantity: <span className="quantity-label">{cartItem.quantity}</span></span>
                                                <span className="update-quantity-link link-primary"> Update </span>
                                                <span className="delete-quantity-link link-primary"> Delete </span>
                                            </div>
                                        </div>

                                        <div className="delivery-options">
                                            <div className="delivery-options-title"> Choose a delivery option: </div>
                                            {deliveryOptions.map((deliveryOption) => {
                                                let priceString = 'FREE SHIPPING'; // here we are creating a variable called priceString that will be used to store the price of the delivery option
                                                
                                                if (deliveryOption.priceCents > 0) {
                                                    priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`; 
                                                    // if the price of the delivery option is greater than 0, we will update the priceString variable to display the price of the delivery option, 
                                                    // we are using template strings to insert the price of the delivery option into the string, we are also using the formatMoney function to format the price of the delivery option correctly
                                                }

                                                return (
                                                    <div key={deliveryOption.id} className="delivery-option">
                                                        <input type="radio" 
                                                        checked={deliveryOption.id === cartItem.deliveryOptionId} // here we are setting the checked attribute of the radio button to true if the delivery option is the same as the one that is currently selected, this will allow us to visually indicate which delivery option is currently selected
                                                        className="delivery-option-input" name={`delivery-option-${cartItem.productId}`} /> {/* here we are creating a new naming attribute for the radio selector, because each set of selector should be unique */}
                                                        <div>
                                                            <div className="delivery-option-date"> {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM, D')} 
                                                                {/* here we use dayjs to set the date of the delivery time, but to make it come in millisecond form, we will use the data in the deliveryOptions 
                                                                 the .format is used to format the way the date is displayed to the user, dddd represents the days (Monday, Tuesday etc), MMMM represents the month, and D represents the day
                                                                 */}
                                                            </div>
                                                            <div className="delivery-option-price">{priceString}</div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title"> Payment Summary </div>
                        <div className="payment-summary-row">
                            <div>Items (3):</div>
                            <div className="payment-summary-money">$42.75</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">$4.99</div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">$47.74</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">$4.77</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">$52.51</div>
                        </div>

                        <button className="place-order-button button-primary"> Place your order </button>
                    </div>
                </div>
            </div>
        </>
    );
}