import { formatMoney } from '../../utils/money';

export function ProductsGrid({ products }) {
    return (
        <div className="products-grid">
            {products.map((product) => { // .map takes each value in an array and tranforms it into something else. Here we are using it to loop through each product in the products array and create a product container for each one.
                return (
                    <div key={product.id} className="product-container"> {/* when looping through an array, each element has to be given a key prop so that react can properly track changes. each key has to be unique so it is best to use the product's id to differentiate */}
                        <div className="product-image-container">
                            <img className="product-image" src={product.image} />
                        </div>

                        <div className="product-name limit-text-to-2-lines"> {product.name} </div>

                        <div className="product-rating-container">
                            <img className="product-rating-stars" src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                            <div className="product-rating-count link-primary"> {product.rating.count} </div>
                        </div>

                        <div className="product-price">{formatMoney(product.priceCents)}</div>

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
    );
}