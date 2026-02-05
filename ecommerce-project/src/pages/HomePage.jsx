import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import './HomePage.css';
/*import { products } from '../../starting-code/data/products';*/ // this is used to import the products data from the data folder
// it is no longer needed because we are getting the products data from the backend using fetch and axios, but it is still here in case we want to use it for testing or if we want to use it as a fallback in case the backend is not working

export function HomePage() {
    const [products, setProducts] = useState([]); //
    
    // fetch is used to get data from an external source, in this case it is getting the products data from the local server
    // this fetch code is does not finish right away, it will take time for the data to be retrieved from the server therefore it is an asynchronous operation
    /* fetch ('http://localhost:3000/api/products') 
        .then((response) => { // when fetch gets a response from the server or the backend, it will save it as a parameter in the inner function and the parameter will be called response
            response.json().then((data) => { // the response object has a method called .json() which gives us the data attached to the response, response.json() is also asynchronous and cannot be saved in a variable; this means that it is also a promise and therefore .then() has to be used again to get the data
                console.log(data); // the data parameter in this inner function contains the actual data from the server, in this case it is the products data; we are logging it to the console to see what it looks like
            });  
        })*/
    
    // the above is one way of getting data from the backend using fetch and promises. there is another shortcut way of doing the above written below.
    
    /*fetch ('http://localhost:3000/api/products')
        .then((response) => { // we use .then() to wait for a response from the backend
            return response.json();
        }) .then((data) => { // this .then() waits for the return response.json() to finish and then it runs the console.log
            console.log(data);
        }); */
    
    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
            .then((response) => {
                setProducts(response.data); // the setProducts function will save the data from the backend into the products state variable above and this variable can then be used to display the products on the page
            });
    }, []); // the empty array as the second parameter makes sure that this useEffect only runs once when the component is first rendered

    /*
    axios.get('http://localhost:3000/api/products') // axios is a library that makes it easier to make requests to the backend. it is similar to fetch but it has some additional features that make it easier to use, like saving the data from the backend directly inside the response object
        .then((response) => {
            response.data; // in axios the data is already converted to json so we can access it directly using response.data
        })
    */


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