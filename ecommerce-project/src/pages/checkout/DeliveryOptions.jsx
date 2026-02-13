import dayjs from 'dayjs';
import { formatMoney } from "../../utils/money";

export function DeliveryOptions({ deliveryOptions, cartItem }) {
    return (
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
    );
}