import './header.css';
import { Link } from 'react-router';

export function Header( { cart } ) { // the cart prop is passed in from the home page and it contains the cart items data from the backend, it is used to display the quantity of items in the cart in the header
    // to calculate the total quantity of the items in the cart, we will need to create a variable called totalQuantity and set it to 0, then we will loop through each item in the cart and add its quantity to the totalQuantity variable, this way we will get the total quantity of items in the cart and we can display it in the header
    let totalQuantity = 0; // this variable will hold the total quantity of items in the cart, it is initialized as 0 because we will be adding the quantity of each item in the cart to it

    cart.forEach(() => { // we are using the forEach method to loop through each item in the cart array and add its quantity to the totalQuantity variable
        totalQuantity += cartItem.quanity; // for each item in the cart, we are adding its quantity to the totalQuantity variable using the += operator which is a shorthand for totalQuantity = totalQuantity + cartItem.quantity
    });
    return (
        <div className="header">
            <div className="left-section">
                <Link to="/" className="header-link">
                    <img className="logo" src="images/logo-white.png" />
                    <img className="mobile-logo" src="images/mobile-logo-white.png" />
                </Link>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" />
                <button className="search-button">
                    <img className="search-icon" src="images/icons/search-icon.png" />
                </button>
            </div>

            <div className="right-section">
                <Link className="orders-link header-link" to="/orders">
                    <span className="orders-text">Orders</span>
                </Link> 

                <Link className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src="images/icons/cart-icon.png" />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </Link>
            </div>
        </div>
    );
}