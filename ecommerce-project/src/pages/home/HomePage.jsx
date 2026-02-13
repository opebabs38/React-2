import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';
/*import { products } from '../../starting-code/data/products';*/ // this is used to import the products data from the data folder
// it is no longer needed because we are getting the products data from the backend using fetch and axios, but it is still here in case we want to use it for testing or if we want to use it as a fallback in case the backend is not working

export function HomePage({ cart }) { // the cart prop is passed in from the App component and it contains the cart items data from the backend, it is used to display the quantity of items in the cart in the header
    const [products, setProducts] = useState([]); // this is a state variable that will hold the products data from the backend, it is initialized as an empty array because we are expecting an array of products from the backend; setProducts is the function that will be used to update the products state variable when we get the data from the backend
    
    /*
    const [cart, setCart] = useState([]); // this is a state variable that will hold the cart items data from the backend, it is initialized as an empty array because we are expecting an array of cart items from the backend; setCart is the function that will be used to update the cart state variable when we get the data from the backend
    // the cart needs to be shared between the homepage and the checkout page therefore it needs to be lifted up to the parent component which is the App component
    */
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
        axios.get('/api/products') // in vite, we can set up a shortcut that allows us to use /api/products instead of the full url, which would be http://localhost:3000/api/products
            .then((response) => {
                setProducts(response.data); // the setProducts function will save the data from the backend into the products state variable above and this variable can then be used to display the products on the page
            });

        /*
        // this will also need to be lifted up into the App component
        axios.get('/api/cart-items')
            .then((response) => {
                setCart(response.data);
            });
        */
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
            <Header cart={cart} /> {/* the quantity for the cart is displayed in the header therefore, it must be passed into the header using a prop*/}
            {/* The Header for this page, the orders and tracking page have been changed to a component because it was reused across multiple pages and it is less time consuming and more maintainable. 
                After the header component was created, it was first imported into the file that use it and then added to the main code as seen above.*/}
            <div className="home-page">
                <ProductsGrid products={products} /> {/* the products data from the backend is passed into the ProductsGrid component as a prop so that it can be used to display the products on the page */}
            </div>
        </>
    );
}