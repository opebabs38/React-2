import { Header } from '../components/Header';
import './HomePage.css';
import { products } from '../../starting-code/data/products'; // this is used to import the products data from the data folder

export function HomePage() {
    return (
        <>
            <title>Ecommerce Project</title>
            <Header />
            {/* The Header for this page, the orders and tracking page have been changed to a component because it was reused across multiple pages and it is less time consuming and more maintainable. 
                After the header component was created, it was first imported into the file that use it and then added to the main code as seen above.*/}
            <div className="home-page">
                <div className="products-grid">
                    {products.map((product) => { // .map takes each value in an array and tranforms it into something else. Here we are using it to loop through each product in the products array and create a product container for each one.
                        return (
                            <div key={product.id} className="product-container"> {/* when looping through an array, each element has to be given a key prop so that react can properly track changes. each key has to be unique so it is best to use the product's id to differentiate */}
                            <div className="product-image-container">
                                <img className="product-image" src= {product.image} />
                            </div>
                            
                            <div className="product-name limit-text-to-2-lines"> {product.name} </div>
                            
                            <div className="product-rating-container">
                                <img className="product-rating-stars" src= {`images/ratings/rating-${product.rating.stars * 10}.png`} />
                                <div className="product-rating-count link-primary"> {product.rating.count} </div>
                            </div>
                            
                            <div className="product-price"> ${(product.priceCents / 100). toFixed(2)}</div> {/* this extra () around the product.price, converts the number into a string and the toFixed tells the system how many decimal places to show */}
                            
                            <div className="product-quantity-container">
                                <select>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            
                            <div className="product-spacer"></div>
                            
                            <div className="added-to-cart">
                                <img src="images/icons/checkmark.png" /> Added</div>
                                
                                <button className="add-to-cart-button button-primary"> Add to Cart</button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}