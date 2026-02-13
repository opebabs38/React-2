import { formatMoney } from '../../utils/money';
import dayjs from 'dayjs';
import { DeliveryOptions } from './DeliveryOptions';

export function OrderSummary({ deliveryOptions, cart }) {
    return (
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
                            <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} />
                        </div>
                    </div>
                );
            })}

        </div>
    );
}